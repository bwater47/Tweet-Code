import express from "express";
import stripe from "../utils/stripe.js";
import bodyParser from "body-parser";
import DonationTransaction from "../models/DonationTransaction.js";
import User from "../models/User.js";
import Donation from "../models/Donation.js";

const router = express.Router();

router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      try {
        const userId = session.metadata.userId;
        const amount = parseFloat(session.metadata.amount);

        // Create donation record
        const donation = await Donation.create({
          name: "Donation",
          description: "Stripe Donation",
          price: amount
        });

        // Create transaction record
        const donationTransaction = await DonationTransaction.create({
          purchaseDate: new Date(),
          donations: [donation._id]
        });

        // Update user
        await User.findByIdAndUpdate(userId, {
          $push: { donationTransactions: donationTransaction._id },
          $inc: { coins: amount * 1000 }
        });

        res.json({ received: true });
      } catch (error) {
        console.error("Error processing webhook:", error);
        res.status(500).send(`Error processing payment: ${error.message}`);
      }
    } else {
      res.json({ received: false });
    }
  }
);

export default router;
