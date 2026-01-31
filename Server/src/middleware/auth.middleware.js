import jwt from "jsonwebtoken";
import FoodPartner from "../models/foodpartner.model.js";
import User from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. Token missing",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECERET);
    const foodPartner = await FoodPartner.findById(
      decoded._id || decoded.id,
    ).select("-password");
    if (!foodPartner) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. Invalid token",
      });
    }
    req.foodPartner = foodPartner;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Authentication failed. something went wrong",
    });
  }
};

const authUserMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. Token missing",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECERET);
    const user = await User.findById(decoded._id || decoded.id).select(
      "-password",
    );
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. Invalid token",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Authentication failed. something went wrong",
    });
  }
};

export { authMiddleware, authUserMiddleware };
