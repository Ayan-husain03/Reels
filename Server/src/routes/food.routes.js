import express from "express";
import {
  authMiddleware,
  authUserMiddleware,
} from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import {
  createFoodItem,
  getAllFoodItem,
  getFoodPartnerById,
  toggleLikeFoodItem,
} from "../controllers/foodItem.controller.js";
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
foodRouter.post("/foodItem/:id/like", authUserMiddleware, toggleLikeFoodItem);

export default foodRouter;
