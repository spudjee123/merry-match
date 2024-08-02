import { application, Router } from "express";
import connectionPool from "../utils/db.mjs";
import express from "express";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";

const app = express();

const stripeRouter = Router();
const stripe = new Stripe(process.env.STRIPE_KEY);
const endpointSecret =
// keyนี้ของตัวเทส
  "whsec_455009c349ca77c55f93710bc9f3fec27e6d5242361f7c8ae317517e597db8f9";

// ยิงreq ไปที่stripeโดยตรง
stripeRouter.post("/api/checkout", express.json(), async (req, res) => {
  const { user, packageName } = req.body;
  // random id
  const orderId = uuidv4();
  const priceId =
    packageName.name === "Basic"
      ? process.env.STRIPE_PRICE_ID_BASIC
      : packageName.name === "Platinum"
      ? process.env.STRIPE_PRICE_ID_PLATINUM
      : process.env.STRIPE_PRICE_ID_PREMIUM;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.BASE_URL}/success`,
      cancel_url: `${process.env.BASE_URL}/membership`,
    });

    const orderData = {
      name: user.name,
      package_name: packageName.name,
      order_id: orderId,
      session_id: session.id,
      status: session.status,
      created_date: new Date(),
    };

    const result = await connectionPool.query(
      `INSERT INTO payment_test (name,package_name,order_id,status,session_id,created_date) 
        VALUES ($1, $2, $3, $4, $5, $6) `,
      [
        orderData.name,
        orderData.package_name,
        orderData.order_id,
        orderData.status,
        orderData.session_id,
        orderData.created_date,
      ]
    );

    console.log("Created session:", session);

    res.status(200).json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ error: error.message });
  }
});

// เช็ค order id ว่า status เป็นยังไง
stripeRouter.get("/api/order/:id", async (req, res) => {
  const orderId = req.params.id;
  try {
    const result = await connectionPool.query(
      `select * from payment_test where order_id = $1 `,
      [orderId]
    );

    res.status(200).json({result });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not read assignment because database connection",
    });
  }
});

stripeRouter.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let eventData;

  try {
    // สร้าง event จาก payload และ signature
    eventData = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log(`Webhook error: ${err.message}`);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  // จัดการกับ event ที่ได้รับ
  switch (eventData.type) {
    case 'checkout.session.completed':
      const sessionCompleted = eventData.data.object;
      
      updateStatus(sessionCompleted.id, 'completed');
      break;
    case 'checkout.session.expired':
      const sessionExpired = eventData.data.object;
      
      updateStatus(sessionExpired.id, 'expired');
      break;

    default:
      console.log(`Unhandled event type ${eventData.type}`);
  }

  res.json({ received: true });
});

function updateStatus(sessionId, status) {
  connectionPool.query(
    'UPDATE payment_test SET status = $1 WHERE session_id = $2',
    [status, sessionId],
    (error, results) => {
      if (error) {
        console.error('Error updating payment status:', error);
      } else {
        console.log(`Payment status for session ${sessionId} updated to ${status}`);
      }
    }
  );
}

export default stripeRouter;
