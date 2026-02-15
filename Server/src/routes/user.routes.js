import express from "express";
import {
  changeUserPassword,
  createFoodPartner,
  createUser,
  loginFoodPartner,
  loginUser,
  logoutFoodPartner,
  logoutUser,
} from "../controllers/user.controller.js";
import { authUserMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// ? User routes

router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/changePassword").put(authUserMiddleware, changeUserPassword);

// // food partner routes
router.route("/register-food-partner").post(createFoodPartner);
router.route("/login-food-partner").post(loginFoodPartner);
router.route("/logout-food-partner").get(logoutFoodPartner);

export default router;
