// server/routes/stripeWebhook.js

import express from "express";
import stripe from "../utils/stripe.js";
import bodyParser from "body-parser";
import DonationTransaction from "../models/DonationTransaction.js";
import User from "../models/User.js";

const router = express.Router();

router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
      console.log("Webhook received:", event.type);
    } catch (err) {
      console.error("Webhook signature verification failed.", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("Checkout session completed:", session);

      try {
        const userId = session.metadata.userId; // Ensure you pass userId in session metadata during creation
        console.log("User ID from metadata:", userId);

        const donationTransaction = await DonationTransaction.create({
          donations: session.display_items.map((item) => ({
            name: item.custom.name,
            price: item.amount,
          })),
        });

        await User.findByIdAndUpdate(userId, {
          $push: { donationTransactions: donationTransaction._id },
        });

        console.log(
          "Donation transaction saved successfully:",
          donationTransaction
        );
        res.status(200).send({ success: true });
      } catch (error) {
        console.error("Error saving donation transaction:", error);
        res.status(500).send({ error: "Internal Server Error" });
      }
    }

    res.json({ received: true });
  }
);


export default router;
