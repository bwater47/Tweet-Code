import { GraphQLError } from "graphql";
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
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      try {
        const user = await User.findById(context.user._id)
          .populate({
            path: "problems",
            select: "_id title description createdAt",
          })
          .populate({
            path: "comments",
            select: "_id content createdAt",
          })
          .populate({
            path: "donationTransactions",
            populate: {
              path: "donations",
              select: "_id name description price",
            },
          });

        if (!user) {
          throw new Error("User not found");
        }

        return user;
      } catch (error) {
        console.error("Error in me query:", error);
        throw new Error(`Failed to fetch user data: ${error.message}`);
      }
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
    usermedals: async (_, { _id }) => {
      if (!_id) {
        throw new Error('User ID is required');
      }
      const user = await User.findById(_id).populate('medals');
      console.log('User:',user);
      if (!user) {
        throw new Error(`User with id ${_id} not found`);
      }
      return user.allMedals;
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
      console.log("Checkout Started!");
      const url = new URL(context.headers.referer).origin;
      const donationtransaction = await DonationTransaction.create({
        donations: args.donations,
      });
      // const donationtransaction = new DonationTransaction({ donations: args.donations });
      // await donationtransaction.save();
      const line_items = [];

      const { donations } = await donationtransaction.populate("donations");
      console.log(donations);
      donations.map(async (donation) => {
        line_items.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: donation.name,
            },
            unit_amount: donation.price * 100,
          },
          quantity: 1,
        });
        // const product = await stripe.products.create({
        // name: donation.name,
        // description: donation.description,
        // });

        // const price = await stripe.prices.create({
        // product: product.id,
        // unit_amount: donation.price * 100,
        // currency: "usd",
        // });

        // line_items.push({
        // price: price.id,
        // quantity: 1,
        // });
      });
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: line_items,
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
    addUser: async (parent, args) => {
      try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: args.email });
        if (existingUser) {
          throw new GraphQLError("A user with this email already exists");
        }

        // Create new user
        const user = await User.create(args);

        // Generate token
        const token = signToken({
          _id: user._id,
          email: user.email,
          username: user.username,
        });

        if (!token) {
          throw new Error("Failed to generate token");
        }

        console.log("User created successfully:", user.username);
        console.log("Token generated:", token);

        return { token, user };
      } catch (error) {
        console.error("Error in addUser mutation:", error);
        throw new AuthenticationError("Failed to create new user");
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
    addMedalToUser: async (parent, { userId, medalId }) => {
      const updatedUser = await User.findByIdAndUpdate(userId, {
        $addToSet: { medals: medalId }
      }, { new: true }).populate('medals');
      return updatedUser;
    },
    // Keeping specific error messages during testing.
    // Will update all to a generic "Authentication Error" message for all afterwards.
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw AuthenticationError;
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw AuthenticationError;
        }

        const token = signToken({
          _id: user._id,
          email: user.email,
          username: user.username,
        });

        if (!token) {
          throw new GraphQLError("Failed to generate token", {
            extensions: { code: "INTERNAL_SERVER_ERROR" },
          });
        }

        console.log("User logged in successfully:", user.username);
        console.log("Token generated:", token);

        return { token, user };
      } catch (error) {
        console.error("Error in login mutation:", error);
        if (error === AuthenticationError) {
          throw error;
        } else {
          throw new GraphQLError("An error occurred during login", {
            extensions: { code: "INTERNAL_SERVER_ERROR" },
          });
        }
      }
    },
    // Problem Management
    createProblem: async (
      parent,
      { title, description, programmingLanguage, code, tags, coinReward },
      context
    ) => {
      if (context.user) {
        const problem = await Problem.create({
          title,
          description,
          programmingLanguage,
          code,
          tags,
          coinReward,
          author: context.user._id,
        });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { problems: problem._id },
        });

        return problem.populate("author");
      }
      throw new AuthenticationError("Not logged in");
    },
    updateProblem: async (
      parent,
      { id, title, description, programmingLanguage, code, tags, coinReward },
      context
    ) => {
      if (context.user) {
        const problem = await Problem.findByIdAndUpdate(
          id,
          {
            title,
            description,
            programmingLanguage,
            code,
            tags,
            coinReward,
          },
          { new: true }
        ).populate("author");

        return problem;
      }
      throw new AuthenticationError("Not logged in");
    },
    deleteProblem: async (parent, { id }, context) => {
      if (context.user) {
        const problem = await Problem.findByIdAndDelete(id);

        if (problem) {
          await User.findByIdAndUpdate(context.user._id, {
            $pull: { problems: id },
          });
          return true;
        }

        return false;
      }
      throw new AuthenticationError("Not logged in");
    },
  },
};

export default resolvers;
