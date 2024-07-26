import { application, Router } from "express";
import connectionPool from "../utils/db.mjs";
import express from 'express'
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";

const app = express()

const stripeRouter = Router();
const stripe = new Stripe(process.env.STRIPE_KEY);

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
        success_url: `${process.env.BASE_URL}/success?id=${orderId}`,
        cancel_url: `${process.env.BASE_URL}/cancel?id=${orderId}`,
      });
  
      const orderData = {
        name: user.name,
        package_name: packageName.name,
        order_id: orderId,
        session_id: session.id,
        status: session.status,
      };
  
      const result = await connectionPool.query(
        `INSERT INTO payment_test (name,package_name,order_id,status,session_id) 
        VALUES ($1, $2, $3, $4, $5) `,
        [
          orderData.name,
          orderData.package_name,
          orderData.order_id,
          orderData.status,
          orderData.session_id,
        ]
      );
  
      console.log("Created session:", session);
  
      res.json({
        url: session.url,
        sessionId: session.id,
    });
    } catch (error) {
      console.error("Error creating session:", error);
      res.status(500).json({ error: error.message });
    }
  });
  
  app.get('/complete', async (req, res) => {
    try {
        // ดึงข้อมูล session และ line items
        const result = await Promise.all([
            stripe.checkout.sessions.retrieve(req.query.session_id, { expand: ['payment_intent.payment_method'] }),
            stripe.checkout.sessions.listLineItems(req.query.session_id)
        ]);

        // บันทึกข้อมูลที่ดึงมา
        console.log(JSON.stringify(result));

        // ส่งข้อความตอบกลับ
        res.send('Your payment was successful');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred');
    }
});

  // เช็ค order id ว่า status เป็นยังไง
  app.get("/api/order/:id", async (req, res) => {
    const orderId = req.params.id;
    try {
      const result = await connectionPool.query(
        `select * from payment_test where order_id = $1 `,
        [orderId]
      );
      res.json({ result: result.rows[0] });
    } catch (error) {
      return res.status(500).json({
        message: "Server could not read assignment because database connection",
      });
    }
  });
  
  stripeRouter.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    async (req, res) => {
      // รับค่า stripe-signature
      const sig = req.headers["stripe-signature"];
      const playload = req.body;
  
      let event;
  
      try {
        // แล้วเอาไปเทียบ
        event = stripe.webhooks.constructEvent(playload, sig, endpointSecret);
      } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
  
      // Handle the event ถ้าทำสำเร็จ
      switch (event.type) {
        case "checkout.session.completed":
          const paymentSucceeded = event.data.object;
          console.log("paymentSucceeded", paymentSucceeded);
          const sessionId = paymentSucceeded.id;
          // Then define and call a function to handle the event payment_intent.succeeded ได้Data objออกมา ถึงจะบอกว่าสำเร็จ
          const status = {
            status: paymentSucceeded.status,
          };
          // จากนั้นหา order จาก session id และ update กลับ
  
          try {
            const result = await connectionPool.query(
              `UPDATE payment_test SET status = $1 WHERE session_id = $2 RETURNING *`,
              [status, sessionId]
            );
            console.log("####result", result.rows[0]);
          } catch (error) {
            console.error("Error updating payment status:", error);
          }
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
  
      // Return a 200 response to acknowledge receipt of the event
      res.send();
    }
  );
  
  stripeRouter.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    async (req, res) => {
      const sig = req.headers["stripe-signature"];
      const payload = req.body;
      const endpointSecret =
    "whsec_b1676a3a278e80bd13ece9492a5de69c6b07f234d4d044d95f30080ac11a7de1";
  
      if (endpointSecret) {
        let event;
  
        try {
          event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        } catch (err) {
          console.error(`Webhook Error: ${err.message}`);
          res.status(400).send(`Webhook Error: ${err.message}`);
          return;
        }
  
        switch (event.type) {
          case "checkout.session.completed":
            const checkoutSessionCompleted = event.data.object;
  
            try {
              const result = await connectionPool.query(
                `UPDATE payment_test SET status = $1 WHERE session_id = $2`,
                ["completed", checkoutSessionCompleted.status]
              );
              console.log(`Order ${checkoutSessionCompleted.id} marked as completed`,result);
            } catch (error) {
              console.error("Error updating order status to completed:", error);
            }
            break;
  
          case "checkout.session.expired":
            const checkoutSessionExpired = event.data.object;
  
            try {
              const result = await connectionPool.query(
                `UPDATE payment_test SET status = $1 WHERE session_id = $2`,
                ["expired", checkoutSessionExpired.status]
              );
              console.log(`Order ${checkoutSessionExpired.id} marked as expired`,result);
            } catch (error) {
              console.error("Error updating order status to expired:", error);
            }
            break;
  
          default:
            console.log(`Unhandled event type ${event.type}`);
        }
  
        res.status(200).send('Received webhook');
      } else {
        res.status(400).send("Webhook Secret is not defined.");
      }
    }
  );

  export default stripeRouter