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
    required: true,
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
// Create a text index for the title, description, and tags fields.
problemSchema.index({ title: "text", description: "text", tags: "text" });
// Create a virtual property for the problem URL.
problemSchema.virtual("url").get(function () {
  return `/problem/${this._id}`;
});
const Problem = mongoose.model("Problem", problemSchema);
export default Problem;
