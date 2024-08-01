import DonationTransaction from "../models/DonationTransaction.js";
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
      throw AuthenticationError;
    },
    donation: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "donationtransactions.donations",
        });
        return user.donations.id(_id);
      }
      throw AuthenticationError;
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const donationtransaction = new DonationTransaction({
        donations: args.donations,
      });
      const line_items = [];
      const { donations } = await donationtransaction.populate("donations");
      for (let i = 0; i < donations.length; i++) {
        const donation = await stripeInstance.donations.create({
          name: donations[i].name,
          description: donations[i].description,
          images: [`${url}/images/${donations[i].image}`],
        });
        const price = await stripeInstance.prices.create({
          donation: donation.id,
          unit_amount: donations[i].price * 100,
          currency: "usd",
        });
        line_items.push({
          price: price.id,
          quantity: 1,
        });
      }
      const session = await stripeInstance.checkout.sessions.create({
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
    addDonationTransaction: async (parent, { donations }, context) => {
      if (context.user) {
        const donationtransaction = new DonationTransaction({ donations });
        await User.findByIdAndUpdate(context.user._id, {
          $push: { donationtransactions: donationtransaction },
        });
        return DonationTransaction;
      }
      throw AuthenticationError;
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
