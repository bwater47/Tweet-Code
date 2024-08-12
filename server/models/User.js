import mongoose from "mongoose";
import bcrypt from "bcrypt";
import DonationTransaction from "./DonationTransaction.js";
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    coins: {
      type: Number,
      default: 0,
    },
    problems: [
      {
        type: Schema.Types.ObjectId,
        ref: "Problem",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    donationTransactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "DonationTransaction",
      },
    ],
    avatar: {
      type: String,
      default: "https://example.com/default-avatar.png",
    },
    medals: [
      {
        type: Schema.Types.ObjectId,
        ref: "Medal",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema
  .virtual("allMedals", {
    ref: "Medal", // The model to use for population
    localField: "medals", // Find medals where `localField`
    foreignField: "_id", // is equal to `foreignField`
  })
  .get(function () {
    const assignedMedals = this.medals || [];
    const dynamicMedals = this.getDynamicMedals();
    return [...assignedMedals, ...dynamicMedals];
  });

userSchema.methods.getDynamicMedals = function () {
  const dynamicMedals = [];

  if (this.problems.length > 20) {
    dynamicMedals.push({
      title: "Champion Seeker",
      description: "has posted over 20 problems",
    });
  } else if (this.problems.length > 10) {
    dynamicMedals.push({
      title: "Expert Seeker",
      description: "has posted over 10 problems",
    });
  } else if (this.problems.length > 5) {
    dynamicMedals.push({
      title: "Novice Seeker",
      description: "has posted over 5 problems",
    });
  }

  if (this.comments.length > 20) {
    dynamicMedals.push({
      title: "Supreme Insight Award",
      description: "has posted over 20 comments",
    });
  } else if (this.comments.length > 10) {
    dynamicMedals.push({
      title: "Advanced Insight Award",
      description: "has posted over 10 comments",
    });
  } else if (this.comments.length > 1) {
    dynamicMedals.push({
      title: "Participation Medal",
      description: "has posted one comment",
    });
  }

  if (this.medals.length + dynamicMedals.length > 5) {
    dynamicMedals.push({
      title: "Supreme Hoarder Medal",
      description: "has collected over 5 Medals",
    });
  } else if (this.medals.length + dynamicMedals.length > 3) {
    dynamicMedals.push({
      title: "The Collector",
      description: "has collected over 3 Medals",
    });
  } else if (this.medals.length + dynamicMedals.length > 1) {
    dynamicMedals.push({
      title: "A Humble Start",
      description: "has collected over 1 Medals",
    });
  }

  return dynamicMedals;
};

// Set up pre-save middleware to create password.
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});
// Compare the incoming password with the hashed password.
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
const User = mongoose.model("User", userSchema);
export default User;
