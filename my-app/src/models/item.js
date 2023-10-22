import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
  },

  price: {
    type: Number,
    required: true,
    trim: true,
  },
});

const Item = mongoose.models.Item || mongoose.model("Item", itemSchema);

export default Item;