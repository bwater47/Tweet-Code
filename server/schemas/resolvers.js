import {
  User,
  Donation,
  DonationTransaction,
  Problem,
} from "../models/index.js";
import { signToken, AuthenticationError } from "../utils/auth.js";
import stripe from "../utils/stripe.js";

export const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "donationTransactions.donations",
        });
        return user;
      }
      throw new AuthenticationError("Not logged in");
    },
    donations: async (parent, {}) => {
      return await Donation.find();
    },
    donation: async (parent, { _id }) => {
      return await Donation.findById(_id);
    },
    user: async (_, __, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "donationtransactions.donations",
        });
        user.donationtransactions.sort(
          (a, b) => b.purchaseDate - a.purchaseDate
        );
        return user;
      }
      throw new AuthenticationError("User not authenticated");
    },
    donationtransaction: async (_, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "donationtransaction.donations",
        });
        return user.donationtransaction.id(_id);
      }
      throw new AuthenticationError("User not authenticated");
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const donationData = args.donations;
      console.log(donationData);
      await DonationTransaction.create({ donations: donationData });
      // const donationtransaction = new DonationTransaction({ donations: args.donations });
      // await donationtransaction.save();
      const line_items = [];

      // const { donations } = await donationtransaction.populate(
      //   "donations"
      // );
      // for (let i = 0; i < donations.length; i++) {
        line_items.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: donationData.name,
            },
            unit_amount: donationData.price * 100,
          },
          quantity: 1,
        });





        // const donation = await stripe.donations.create({
        //   name: donations[i].name,
        //   description: donations[i].description,
        // });
        // const price = await stripe.prices.create({
        //   donation: donation.id,
        //   unit_amount: donations[i].price * 100,
        //   currency: "usd",
        // });
        // line_items.push({
        //   price: price.id,
        // });
      // }
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
    problems: async () => {
      try {
        return await Problem.find().populate("author");
      } catch (error) {
        console.error("Error fetching problems:", error);
        throw new Error("Failed to fetch problems");
      }
    },

    problem: async (parent, { _id }) => {
      try {
        return await Problem.findById(_id).populate("author");
      } catch (error) {
        console.error("Error fetching problem:", error);
        throw new Error("Failed to fetch problem");
      }
    },
  },
  Mutation: {
    addUser: async (
      parent,
      { firstName, lastName, username, email, password }
    ) => {
      try {
        const user = await User.create({
          firstName,
          lastName,
          username,
          email,
          password,
        });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error(error);
        throw new AuthenticationError("Error creating user");
      }
    },
    makeDonationTransaction: async (parent, { donationId }, context) => {
      if (context.user) {
        const donationtransaction = new DonationTransaction({
          donations: [donationId],
        });
        await User.findByIdAndUpdate(context.user._id, {
          $push: { donationtransactions: donationtransaction },
        });
        return donationtransaction;
      }
      throw new AuthenticationError("Not logged in");
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        try {
          return await User.findByIdAndUpdate(context.user._id, args, {
            new: true,
          });
        } catch (error) {
          console.error(error);
          throw new AuthenticationError("Error updating user");
        }
      }
      throw new AuthenticationError("Not logged in");
    },
    // Keeping specific error messages during testing.
    // Will update all to a generic "Authentication Error" message for all afterwards.
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError(
            "No user found with this email address"
          );
        }

        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError("Incorrect password");
        }

        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error(error);
        throw new AuthenticationError("Error logging in");
      }
    },
  },
};

export default resolvers;
