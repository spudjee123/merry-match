import { application, Router } from "express";
import connectionPool from "../utils/db.mjs";
import express from "express";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";
import dotenv from 'dotenv';

const app = express();

const stripeRouter = Router();
const stripe = new Stripe(process.env.STRIPE_KEY);


// แบบ intent
dotenv.config();

stripeRouter.post("/api/payment-intent", express.json(), async (req, res) => {
  const { user, packageName, paymentIntentId, clientSecret } = req.body;

  // Generate a unique order ID if not provided
  const orderId = paymentIntentId ? undefined : uuidv4();

  if (!paymentIntentId) {
    console.log("Received package name:", packageName.name);

    // Determine the price amount based on the package name
    const priceAmount = packageName.price;
    console.log("Retrieved price amount:", priceAmount);

    if (!priceAmount) {
      return res.status(400).json({ error: "Invalid package name." });
    }

    try {
      // Create a new customer in Stripe
      const customer = await stripe.customers.create({
        name: user.name, // Ensure user has a 'name' field
        email: user.email,
        metadata: {
          userId: user.id,
        },
      });
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
          user_name: user.name, // Added 'user_name' for clarity
        },
      });

      // Insert the order data into the payment_test table
      const orderData = {
        name: user.name, // Ensure this matches your database schema
        package_name: packageName.name,
        order_id: orderId,
        payment_intent_id: paymentIntent.id,
        created_date: new Date(),
      };
      console.log(paymentIntent);

      await connectionPool.query(
        `INSERT INTO payment_test (name, package_name, order_id, payment_intent_id, created_date) 
          VALUES ($1, $2, $3, $4, $5)`,
        [
          orderData.name,
          orderData.package_name,
          orderData.order_id,
          orderData.payment_intent_id,
          orderData.created_date,
        ]
      );

      // Respond with the client secret for the PaymentIntent
      res.status(200).json({
        message: 'PaymentIntent created successfully',
        clientSecret: paymentIntent.client_secret,
        order_id: orderId
      });
} catch (error) {
      console.error("Error creating PaymentIntent:", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    if (!clientSecret) {
      return res.status(400).json({ error: 'Missing clientSecret.' });
    }

    try {
      await connectionPool.query(
        `UPDATE payment_test SET status = $1, client_secret = $2 WHERE payment_intent_id = $3`,
        ['complete', clientSecret, paymentIntentId]
      );
      res.status(200).json({ message: 'Order status and clientSecret updated successfully.' });
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ error: 'Failed to update order status.' });
    }
  }
});

stripeRouter.get("/update/payment/:id", express.json(), async (req, res) => {
  const { id } = req.params; // รับค่า id จาก params

  try {
    // ดึง payment_intent_id จากฐานข้อมูล
    const order = await connectionPool.query(
      'SELECT payment_intent_id FROM payment_test WHERE order_id = $1',
      [id]
    );

    if (!order.rows.length) {
      return res.status(404).json({ message: 'ไม่พบคำสั่งซ่อมในคำขอ' });
    }

    const { payment_intent_id } = order.rows[0]; // รับ payment_intent_id จากผลลัพธ์

    // ดึงข้อมูล PaymentIntent จาก Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent_id);

    return res.status(200).json({
      message: 'ดึงข้อมูล payment intent สำเร็จ',
      clientSecret: paymentIntent.client_secret
    });

  } catch (error) {
    console.error('Error retrieving PaymentIntent:', error);
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลการชำระเงิน' });
  }
});
export default stripeRouter;





