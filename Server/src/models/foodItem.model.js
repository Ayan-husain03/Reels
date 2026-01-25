import mongoose, { mongo } from "mongoose";

const foodItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    video: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const FoodItem = mongoose.model("FoodItem".foodItemSchema);

export default FoodItem;
