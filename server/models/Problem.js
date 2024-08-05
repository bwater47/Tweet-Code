import mongoose from "mongoose";
const { Schema } = mongoose;

const problemSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    default: "",
  },
  programmingLanguage: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  tags: [
    {
      type: String,
      trim: true,
    },
  ],
  coinReward: {
    type: Number,
    default: 0,
    min: 0,
  },
});

problemSchema.index({ title: "text", description: "text", tags: "text" });

problemSchema.virtual("url").get(function () {
  return `/problem/${this._id}`;
});

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
