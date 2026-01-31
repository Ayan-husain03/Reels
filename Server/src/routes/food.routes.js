import express from "express";
import {
  authMiddleware,
  authUserMiddleware,
} from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import {
  createFoodItem,
  getAllFoodItem,
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

export default foodRouter;
