import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    index: true,
  },
  solution: {
    type: Schema.Types.ObjectId,
    ref: "Solution",
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  votes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      value: {
        type: Number,
        enum: [-1, 1], // -1 for downvote, 1 for upvote
        required: true,
      },
    },
  ],
  replies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

// Ensure comment is associated with either a post or a solution, but not both
commentSchema.pre("validate", function (next) {
  if ((this.post && this.solution) || (!this.post && !this.solution)) {
    next(
      new Error(
        "Comment must be associated with either a post or a solution, but not both."
      )
    );
  }
  next();
});

// Update the 'updatedAt' field before saving
commentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Add indexes
commentSchema.index({ post: 1, createdAt: -1 });
commentSchema.index({ solution: 1, createdAt: -1 });

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
