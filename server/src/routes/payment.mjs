import { application, Router } from "express";
import connectionPool from "../utils/db.mjs";
import express from "express";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";
import dotenv from 'dotenv';

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
  const newOrederId = String(orderId)
  try {
    const result = await connectionPool.query(
      `select package_name from payment_test where order_id = $1 `,
      [newOrederId]
    );

    res.status(200).json(result.rows[0] );
  } catch (error) {
    return res.status(500).json({
      message: "Server could not read assignment because database connection",
    });
  }
});

stripeRouter.get('/complete', async (req, res) => {
  try {
    const [session, lineItems] = await Promise.all([
      stripe.checkout.sessions.retrieve(req.query.session_id, { expand: ['payment_intent.payment_method'] }),
      stripe.checkout.sessions.listLineItems(req.query.session_id)
    ]);

    console.log("Session:", JSON.stringify(session));
    console.log("Line Items:", JSON.stringify(lineItems));

    res.send('Your payment was successful');
  } catch (error) {
    console.error("Error retrieving session:", error);
    res.status(500).send('Error retrieving payment details');
  }
})

stripeRouter.get('/cancel', (req, res) => {
  res.redirect('/')
})

// แบบ intent
dotenv.config();



stripeRouter.post("/api/payment-intent", express.json(), async (req, res) => {
  const { user, packageName } = req.body;
  const orderId = uuidv4();

  console.log("Received package name:", packageName.name);

  // Determine the price amount based on the package name
  const priceAmount = packageName.price

  console.log("Retrieved price amount:", priceAmount);


  if (!priceAmount) {
    return res.status(400).json({ error: "Invalid package name." });
  }
  
  try {
    // Create a new customer in Stripe if not already created
    const customer = await stripe.customers.create({
      name: user.name,
      email: user.email,
      metadata: {
        userId: user.id,
      },
    });

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: priceAmount * 100, // Convert the price to the smallest unit
      currency: 'thb',
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        order_id: orderId,
        package_name: packageName.name,
      },
    });

    // Insert the order data into the payment_test table
    const orderData = {
      package_name: packageName.name,
      order_id: orderId,
      payment_intent_id: paymentIntent.id,
      status: 'pending', 
      created_date: new Date(),
    };
    console.log(paymentIntent)
    await connectionPool.query(
      `INSERT INTO payment_test (package_name, order_id, status, intent_id, created_date) 
        VALUES ($1, $2, $3, $4, $5)`,
      [
        orderData.package_name,
        orderData.order_id,
        orderData.status,
        orderData.intent_id,
        orderData.created_date,
      ]
    );

    // Respond with the client secret for the PaymentIntent
    res.status(200).json({
      message: 'สร้าง payment intent สำเร็จ',
      // ส่งไปหน้าบ้าน
      clientSecret: paymentIntent.client_secret,
    });

  } catch (error) {
    console.error("Error creating Payment Intent:", error);
    res.status(500).json({ error: error.message });
  }
});

stripeRouter.put("/update/payment", express.json(), async (req, res) => {
  try {
    // Create a new customer in Stripe if not already created
    const customer = await stripe.customers.create({
      name: user.name,
      email: user.email,
      metadata: {
        userId: user.id,
      },
    });

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: priceAmount * 100, // Convert the price to the smallest unit
      currency: 'thb',
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        order_id: orderId,
        package_name: packageName.name,
      },
    });

    // Insert the order data into the payment_test table
    const orderData = {
      order_id: orderId,
      created_date: new Date(),
    };
    console.log(paymentIntent)
    await connectionPool.query(
      `Upadte payment_test set inten_id = $1 where order_id = $2`,
      [
        orderData.order_id,
        orderData.created_date,
      ]
    );

    // Respond with the client secret for the PaymentIntent
    res.status(200).json({
      message: 'update payment intent สำเร็จ',
      // ส่งไปหน้าบ้าน
      clientSecret: paymentIntent.client_secret,
    });

  } catch (error) {
    console.error("Error creating Payment Intent:", error);
    res.status(500).json({ error: error.message });
  }
});

export default stripeRouter;
