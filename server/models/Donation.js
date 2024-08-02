import mongoose from "mongoose";
const { Schema } = mongoose;
const donationSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
    min: 0.99,
  },
});
const Donation = mongoose.model("Donation", donationSchema);
export default Donation;
