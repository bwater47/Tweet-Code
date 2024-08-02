import mongoose from "mongoose";

const { Schema } = mongoose;

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

const DonationTransaction = mongoose.model(
  "DonationTransaction",
  DonationTransactionSchema
);

export default DonationTransaction;
