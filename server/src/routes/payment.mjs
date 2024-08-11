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
      name: user,
      email: user.email,
      metadata: {
        userId: user.id,
      },
    });

    // Create a PaymentIntent with the order amount and currency

    // Insert the order data into the payment_test table
    const orderData = {
      name:user,
      package_name: packageName.name,
      order_id: orderId,
      payment_intent_id: paymentIntent.id,
      status: 'pending', 
      created_date: new Date(),
    };
    console.log(paymentIntent)
    await connectionPool.query(
      `INSERT INTO payment_test (name,package_name, order_id, status, payment_intent_id, created_date) 
        VALUES ($1, $2, $3, $4, $5,$6)`,
      [
        orderData.name,
        orderData.package_name,
        orderData.order_id,
        orderData.status,
        orderData.payment_intent_id,
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
