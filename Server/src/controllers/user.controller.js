import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function createUser(req, res) {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(401).json({
        message: "All fields are required",
      });
    }
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({
        message: "user already exist",
      });
    }
    const hashPass = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      email,
      password: hashPass,
    });

    const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res
      .status(201)
      .cookie("token", token)
      .json({
        message: "user createed succesfully",
        user: {
          id: user?._id,
          email: user.email,
          fullName: user.fullName,
        },
      });
  } catch (error) {
    return res.status(500).json({
      message: "internal server user haven't created",
      error: error,
    });
  }
}

export { createUser };
