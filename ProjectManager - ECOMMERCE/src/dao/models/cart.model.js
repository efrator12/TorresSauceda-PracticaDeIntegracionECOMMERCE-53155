import mongoose from "mongoose";

const cartCollection = "carts";
const cartSchema = new mongoose.Schema({
  products: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        require: true,
      },
      quantity: {
        type: Number,
        require: true,
      },
    },
  ],
});

export const cartModel = mongoose.model(cartCollection, cartSchema);
