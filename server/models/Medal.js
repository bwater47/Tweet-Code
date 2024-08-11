import mongoose from "mongoose";
const { Schema } = mongoose;

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
      }
});





const Medal = mongoose.model("Medal", medalSchema);

export default Medal;
