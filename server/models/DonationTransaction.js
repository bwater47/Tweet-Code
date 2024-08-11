// Import mongoose package.
import mongoose from "mongoose";
// Create a schema for donation transaction.
const { Schema } = mongoose;
// Define the schema for donation transaction.
const DonationTransactionSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  donations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Donation",
    },
  ],
});
// Create a model using the schema, and pass the model name and schema as arguments.
const DonationTransaction = mongoose.model(
  "DonationTransaction",
  DonationTransactionSchema
);
// Export the model.
export default DonationTransaction;
