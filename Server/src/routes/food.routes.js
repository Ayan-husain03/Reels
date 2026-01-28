import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { createFoodItem } from "../controllers/foodItem.controller.js";
// import { createFoodPartner } from "../controllers/user.controller.js";

const foodRouter = express.Router();

foodRouter.post(
  "/create-food",
  authMiddleware,
  upload.single("video"),
  createFoodItem,
);

export default foodRouter;
