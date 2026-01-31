import { uploadFile } from "../lib/imagekit.js";
import FoodItem from "../models/foodItem.model.js";

async function createFoodItem(req, res) {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Food name is required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Video file is required",
      });
    }
    // ! Upload video to ImageKit

    const uploadFileResult = await uploadFile(
      req.file.buffer,
      `video_${Date.now()}`,
    );

    // console.log("UPLOAD RESULT:", uploadFileResult);
    // 14
    const foodItem = await FoodItem.create({
      name,
      description,
      video: uploadFileResult?.url,
      foodPartner: req.foodPartner?._id,
    });

    return res.status(201).json({
      success: true,
      message: "Food item created successfully",
      data: foodItem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export { createFoodItem };
