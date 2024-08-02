//import DonationTransaction from "../models/DonationTransaction.js";
import { User, Donation, DonationTransaction } from "../models/index.js";
import { signToken, AuthenticationError } from "../utils/auth.js";
import stripe from "stripe";

const stripeInstance = stripe("");

export const resolvers = {
  Query: {
    donations: async (parent, {}) => {
      return await Donation.find();
    },
    donation: async (parent, { _id }) => {
      return await Donation.findById(_id);
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "donationtransactions.donations",
        });
        user.donations.sort((a, b) => b.purchaseDate - a.purchaseDate);
        return user;
      }
      throw new AuthenticationError("User not authenticated");
    },
    donation: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "donationtransactions.donations",
        });
        return user.donations.find((d) => d._id.toString() === _id);
      }
      throw new AuthenticationError("User not authenticated");
    },
    checkout: async (parent, { donations }, context) => {
      const url = new URL(context.headers.referer).origin;
      const donationTransaction = new DonationTransaction({ donations });
      const line_items = [];

      const { donations: donationList } = await donationTransaction.populate(
        "donations"
      );
      for (let i = 0; i < donationList.length; i++) {
        const donation = await stripe.products.create({
          name: donationList[i].name,
          description: donationList[i].description,
        });
        const price = await stripe.prices.create({
          product: donation.id,
          unit_amount: donationList[i].amount * 100, // Use amount instead of price
          currency: "usd",
        });
        line_items.push({
          price: price.id,
          quantity: 1,
        });
      }
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    makeDonation: async (parent, { donationId, amount }, context) => {
      if (context.user) {
        const donationTransaction = new DonationTransaction({
          donations: [donationId],
        });
        await donationTransaction.save();
        await User.findByIdAndUpdate(context.user._id, {
          $push: { donationTransactions: donationTransaction },
        });
        return donationTransaction;
      }
      throw new AuthenticationError("Not logged in");
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }
      throw AuthenticationError;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { token, user };
    },
  },
};

export default resolvers;
