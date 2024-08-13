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
  const { user, packageName, paymentIntentId, email } = req.body;

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
        name: user, // Ensure user has a 'name' field
        email: email,
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
          user_name: user, // Added 'user_name' for clarity
        },
      });

      // Insert the order data into the payment_test table
      const orderData = {
        name: user, // Ensure this matches your database schema
        packages_name: packageName.name,
        order_id: orderId,
        status: "pending",
        payment_intent_id: paymentIntent.id,
        created_date: new Date(),
      };
      console.log(paymentIntent);

      await connectionPool.query(
        `INSERT INTO payment_test (name, packages_name, order_id,status, payment_intent_id, created_date) 
          VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          orderData.name,
          orderData.packages_name,
          orderData.order_id,
          orderData.status,
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
  } 
});

// update status 
stripeRouter.post('/status', express.json(), async (req, res) => {
  let { paymentIntentId } = req.body;

  if (!paymentIntentId) {
    return res.status(400).json({ error: 'Payment intent ID is required' });
  }
  let result
  try {
   
    result = await connectionPool.query(
      'UPDATE payment_test SET status = $1 WHERE payment_intent_id = $2',
      ['success', paymentIntentId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Payment intent not found' });
    }

    res.status(200).json({ message: 'Payment status updated to complete successfully' });
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});

stripeRouter.post("/", express.json(), async (req, res) => {
  const { userName } = req.body; 
  try {
    const userData = {
      user : userName
    }
    const order = await connectionPool.query(
      `select  packages_name, merry_limit, price, icons from payment_test pt inner join packages p using(packages_name) where pt.name = $1 
       order by pt.created_date desc limit 1 `,
      [userData.user]
    );

    if (!order.rows.length) {
      return res.status(404).json({ message: 'not found' });
    }
    
    return res.status(200).json({
      message: 'get data successfully',
      data: order.rows[0]
    });

  } catch (error) {
    console.error('Error retrieving PaymentIntent:', error);
    return res.status(500).json({ message: 'server error' });
  }
});

stripeRouter.put('/cancel/package', async (req, res) => {
  const { userName } = req.body; 

  if (!userName) {
    return res.status(400).json({ message: 'userName is required' });
  }

  try {
    const result = await connectionPool.query(
      `UPDATE payment_test 
      SET packages_name = NULL 
      WHERE ctid = (
        SELECT ctid 
        FROM payment_test 
        WHERE name = $1
        ORDER BY created_date DESC 
        LIMIT 1
      )`,
     [userName]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' }); 
    }
    return res.status(200).json({ message: 'Package name updated to NULL successfully' });
    } catch (error) {
    console.error('Error updating package_name:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default stripeRouter;





