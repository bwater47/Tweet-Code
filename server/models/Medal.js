// Import mongoose from the mongoose package.
import mongoose from "mongoose";
// Destructure the Schema class from mongoose.
const { Schema } = mongoose;
// Create a new schema for the Medal model.
const medalSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
});
// Create a model for the Medal schema using mongoose's model method.
const Medal = mongoose.model("Medal", medalSchema);
// Export the Medal model.
export default Medal;
