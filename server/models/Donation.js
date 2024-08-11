// Import mongoose package.
import mongoose from "mongoose";
// Create a schema for donation.
const { Schema } = mongoose;
// Define the schema for donation.
const donationSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0.99,
    default: 10.0,
  },
});
// Create a model using the schema, and pass the model name and schema as arguments.
const Donation = mongoose.model("Donation", donationSchema);
// Export the model.
export default Donation;
