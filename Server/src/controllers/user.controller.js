import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// * create user function
async function createUser(req, res) {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({
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

    const token = await jwt.sign({ id: user?._id }, process.env.JWT_SECERET, {
      expiresIn: "1d",
    });
    return res
      .status(201)
      .cookie("token", token)
      .json({
        message: "user created successfully",
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

// * login user function

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const isUserExist = await User.findOne({ email });
    if (!isUserExist) {
      return res.status(400).json({
        message: "User doesn't exist with this email",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserExist.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "invalid password",
      });
    }
    const token = await jwt.sign(
      { id: isUserExist?._id },
      process.env.JWT_SECERET,
      {
        expiresIn: "1d",
      }
    );

    return res
      .status(200)
      .cookie("token", token)
      .json({
        message: "login successfully",
        user: {
          id: isUserExist?._id,
          email: isUserExist.email,
          fullName: isUserExist.fullName,
        },
      });
  } catch (error) {
    return res.status(500).json({
      message: "internal server user is not logged in",
      error: error,
    });
  }
}

export { createUser, loginUser };
