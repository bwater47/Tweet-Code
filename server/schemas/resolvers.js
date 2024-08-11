import { GraphQLError } from "graphql";
import {
  User,
  Donation,
  DonationTransaction,
  Problem,
  Medal,
  Comment,
} from "../models/index.js";
import { signToken, AuthenticationError } from "../utils/auth.js";
import stripe from "../utils/stripe.js";
import { GraphQLUpload } from "graphql-upload-minimal";
import { uploadToCloudinary } from "../utils/cloudinary.js";

export const resolvers = {
  Upload: GraphQLUpload,
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
        throw new Error("User ID is required");
      }
      const user = await User.findById(_id).populate("medals");
      console.log("User:", user);
      if (!user) {
        throw new Error(`User with id ${_id} not found`);
      }
      return user.allMedals;
    },
    medals: async () => {
      const medals = await Medal.find();
      console.log("Medals:", medals);
      if (!medals) {
        throw new Error(`no medals found`);
      }
      return medals;
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
        return await Problem.findById(_id)
          .populate("author")
          .populate({
            path: "comments",
            populate: { path: "author" },
          });
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
    updateUser: async (
      _,
      { username, firstName, lastName, avatar },
      context
    ) => {
      if (!context.user) {
        throw new AuthenticationError("Not logged in");
      }

      try {
        const updates = { username, firstName, lastName };

        if (avatar) {
          console.log("Avatar received in resolver:", avatar);
          // Await the resolution of the avatar Promise
          const resolvedAvatar = await avatar;
          console.log("Resolved avatar:", resolvedAvatar);
          const avatarUrl = await uploadToCloudinary(resolvedAvatar);
          updates.avatar = avatarUrl;
        }

        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          updates,
          { new: true, runValidators: true }
        );

        if (!updatedUser) {
          throw new Error("User not found");
        }

        return updatedUser;
      } catch (error) {
        console.error("Error in updateUser mutation:", error);
        throw new Error(`Failed to update user: ${error.message}`);
      }
    },
    addMedalToUser: async (parent, { userId, medalId }) => {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: { medals: medalId },
        },
        { new: true }
      ).populate("medals");
      return updatedUser;
    },
    updateCoins: async (parent, { amount, userId }) => {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $inc: { coins: amount },
        },
        { new: true }
      );
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

    // Comment Management:
    addComment: async (
      parent,
      { problemId, content, code, language },
      context
    ) => {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in to comment");
      }
      try {
        const comment = new Comment({
          content,
          author: context.user._id,
          problem: problemId,
          code,
          language,
          votes: [], // Initialize with an empty array
        });
        await comment.save();
        await Problem.findByIdAndUpdate(problemId, {
          $push: { comments: comment._id },
        });
        return comment.populate("author");
      } catch (error) {
        console.error("Error adding comment:", error);
        throw new Error("Failed to add comment");
      }
    },

    updateComment: async (
      parent,
      { commentId, content, code, language },
      context
    ) => {
      if (!context.user) {
        throw new AuthenticationError(
          "You must be logged in to update a comment"
        );
      }
      try {
        const comment = await Comment.findById(commentId);
        if (comment.author.toString() !== context.user._id.toString()) {
          throw new AuthenticationError(
            "You can only update your own comments"
          );
        }
        comment.content = content || comment.content;
        comment.code = code || comment.code;
        comment.language = language || comment.language;
        comment.updatedAt = new Date();
        await comment.save();
        return comment.populate("author");
      } catch (error) {
        console.error("Error updating comment:", error);
        throw new Error("Failed to update comment");
      }
    },

    deleteComment: async (parent, { commentId }, context) => {
      if (!context.user) {
        throw new AuthenticationError(
          "You must be logged in to delete a comment"
        );
      }
      try {
        const comment = await Comment.findById(commentId);
        if (comment.author.toString() !== context.user._id.toString()) {
          throw new AuthenticationError(
            "You can only delete your own comments"
          );
        }
        await Comment.findByIdAndDelete(commentId);
        await Problem.findByIdAndUpdate(comment.problem, {
          $pull: { comments: commentId },
        });
        return true;
      } catch (error) {
        console.error("Error deleting comment:", error);
        throw new Error("Failed to delete comment");
      }
    },

    markCommentAsSolution: async (parent, { commentId }, context) => {
      if (!context.user) {
        throw new AuthenticationError(
          "You must be logged in to mark a solution"
        );
      }
      try {
        const comment = await Comment.findById(commentId).populate("problem");
        if (comment.problem.author.toString() !== context.user._id.toString()) {
          throw new AuthenticationError(
            "Only the problem author can mark a solution"
          );
        }
        comment.isSolution = true;
        await comment.save();
        return comment.populate("author");
      } catch (error) {
        console.error("Error marking comment as solution:", error);
        throw new Error("Failed to mark comment as solution");
      }
    },

    voteComment: async (parent, { commentId, value }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in to vote");
      }
      try {
        const comment = await Comment.findById(commentId);
        const existingVoteIndex = comment.votes.findIndex(
          (v) => v.user.toString() === context.user._id.toString()
        );
        if (existingVoteIndex > -1) {
          comment.votes[existingVoteIndex].value = value;
        } else {
          comment.votes.push({ user: context.user._id, value });
        }
        await comment.save();
        return comment.populate("author");
      } catch (error) {
        console.error("Error voting on comment:", error);
        throw new Error("Failed to vote on comment");
      }
    },

    addReplyToComment: async (
      parent,
      { parentCommentId, content, code, language },
      context
    ) => {
      if (!context.user) {
        throw new AuthenticationError(
          "You must be logged in to reply to a comment"
        );
      }
      try {
        const parentComment = await Comment.findById(parentCommentId);
        const reply = new Comment({
          content,
          author: context.user._id,
          problem: parentComment.problem,
          code,
          language,
        });
        await reply.save();
        parentComment.replies.push(reply._id);
        await parentComment.save();
        return reply.populate("author");
      } catch (error) {
        console.error("Error adding reply to comment:", error);
        throw new Error("Failed to add reply to comment");
      }
    },
  },
};

export default resolvers;
