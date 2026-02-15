import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import FoodPartner from "../models/foodpartner.model.js";

// * create user function
async function createUser(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
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
      name,
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
          name: user.name,
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
      isUserExist.password,
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
      },
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

// * logout user function

async function logoutUser(req, res) {
  try {
    return res.status(200).clearCookie("token").json({
      message: "User logged out",
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server user is not logged out",
      error: error,
    });
  }
}

// ? Food partner routes

// // create food partner
async function createFoodPartner(req, res) {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name || !email || !password || !phone || !address) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const isUserExist = await FoodPartner.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({
        message: "food partner already exist",
      });
    }
    const hashPass = await bcrypt.hash(password, 10);
    const user = await FoodPartner.create({
      name,
      email,
      password: hashPass,
      phone,
      address,
    });

    const token = await jwt.sign({ id: user?._id }, process.env.JWT_SECERET, {
      expiresIn: "1d",
    });
    return res
      .status(201)
      .cookie("token", token)
      .json({
        message: "food partner created successfully",
        user: {
          id: user?._id,
          email: user.email,
          name: user.name,
          phone: user.phone,
          address: user.address,
        },
      });
  } catch (error) {
    return res.status(500).json({
      message: "internal server foodpartner haven't created",
      error: error,
    });
  }
}

// // login food partner

async function loginFoodPartner(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const isUserExist = await FoodPartner.findOne({ email });
    if (!isUserExist) {
      return res.status(400).json({
        message: "foodPartner doesn't exist with this email",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserExist.password,
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "invalid password",
      });
    }
    const token = await jwt.sign(
      { id: isUserExist?._id },
      process.env.JWT_SECERET,
      {
        expiresIn: "1d",
      },
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

// // logout user function

async function logoutFoodPartner(req, res) {
  try {
    return res.status(200).clearCookie("token").json({
      message: "User logged out",
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server user is not logged out",
      error: error,
    });
  }
}

async function changeUserPassword(req, res) {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = req.user;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    if (oldPassword === newPassword) {
      return res.status(400).json({
        message: "new password should not be same please enter new password",
      });
    }
    // check password
    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "oldPassword is incorrect",
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({
      message: "password changed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error in changing password",
      error: error,
    });
  }
}

export {
  createUser,
  loginUser,
  logoutUser,
  logoutFoodPartner,
  loginFoodPartner,
  createFoodPartner,
  changeUserPassword,
};
