import { uploadFile } from "../lib/imagekit.js";
import FoodItem from "../models/foodItem.model.js";
import FoodPartner from "../models/foodpartner.model.js";

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

const getAllFoodItem = async (req, res) => {
  try {
    const foodItems = await FoodItem.find().populate("foodPartner", "_id name");
    return res.status(200).json({
      success: true,
      count: foodItems.length,
      data: foodItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Food items fetch failed",
      error: error.message,
    });
  }
};

const getFoodPartnerById = async (req, res) => {
  try {
    const foodPartnerId = req.params._id;
    const foodPartner = await FoodPartner.findById(foodPartnerId);

    if (!foodPartner) {
      return res.status(404).json({
        message: "food partner not found",
      });
    }
    const foodItems = await FoodItem.find({
      foodPartner: foodPartnerId,
    });
    return res.status(200).json({
      foodPartner,
      foodItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Food items fetch failed",
      error: error.message,
    });
  }
};

// // toggle like for foodItem
async function toggleLikeFoodItem(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user?._id;
    const foodItem = await FoodItem.findById(id);
    if (!foodItem) {
      res.status(404).json({
        message: "FoodItem not found",
      });
    }
    const alreadyLiked = foodItem.likes.includes(userId);
    if (alreadyLiked) {
      foodItem.likes.pull(userId);
    } else {
      foodItem.likes.push(userId);
    }
    await foodItem.save();
    res.status(200).json({
      message: "Like status updated",
      likesCount: foodItem.likes.length,
    });
  } catch (error) {
    res.status(500).json({
      message: "foodItem liked failed",
      error: error.message,
    });
  }
}

// ? toggle save foodItem
async function toggleSaveFoodItem(req, res) {
  try {
    const { id } = req.params;
    const userId = req?.user?._id;
    const foodItem = await FoodItem.findById(id);
    if (!foodItem) {
      res.status(404).json({
        message: "FoodItem not found",
      });
    }
    const isAlreadySaved = foodItem.savedBy.includes(userId);
    if (isAlreadySaved) {
      foodItem.savedBy.pull(userId); // * unsave savedFood
    } else {
      foodItem.savedBy.addToSet(userId); // ! save foodItem   // duplicate-safe add
    }
    await foodItem.save();

    res.status(200).json({
      message: "Save status updated",
      savesCount: foodItem.savedBy.length,
      // isSaved: !alreadySaved,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error while saving food" });
  }
}

// * getAllSaveFood

const getAllSaveFoodItem = async (req, res) => {
  const userId = req?.user?._id;
  try {
    const savedFoodItems = await FoodItem.find({
      savedBy: userId,
    }).populate("foodPartner", "_id name");
    if (savedFoodItems.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No food item saved",
        data: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: "foodItems fetched",
      data: savedFoodItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get saved food items",
      error: error.message,
    });
  }
};

export {
  createFoodItem,
  getAllFoodItem,
  getFoodPartnerById,
  toggleLikeFoodItem,
  toggleSaveFoodItem,
  getAllSaveFoodItem,
};
