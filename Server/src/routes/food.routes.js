import express from "express";
import {
  authMiddleware,
  authUserMiddleware,
} from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import {
  createFoodItem,
  getAllFoodItem,
  getAllSaveFoodItem,
  getFoodPartnerById,
  toggleLikeFoodItem,
  toggleSaveFoodItem,
} from "../controllers/foodItem.controller.js";
import { addComment, getAllComment } from "../controllers/comment.controller.js";
// import { createFoodPartner } from "../controllers/user.controller.js";

const foodRouter = express.Router();

foodRouter.post(
  "/create-food",
  authMiddleware,
  upload.single("video"),
  createFoodItem,
);
foodRouter.get("/all", authUserMiddleware, getAllFoodItem);
foodRouter.get("/food-partner/:_id", authUserMiddleware, getFoodPartnerById);
foodRouter.get("/saved-foods", authUserMiddleware, getAllSaveFoodItem);
foodRouter.post("/foodItem/:id/like", authUserMiddleware, toggleLikeFoodItem);
foodRouter.post("/foodItem/:id/save", authUserMiddleware, toggleSaveFoodItem);

// comments routes
foodRouter.post("/comment/:foodId", authUserMiddleware, addComment);
foodRouter.get("/comment/:foodId", getAllComment);

export default foodRouter;
