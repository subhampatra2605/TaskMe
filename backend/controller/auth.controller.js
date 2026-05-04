import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// ================= SIGNUP =================
export const signup = async (req, res, next) => {
  const { name, email, password, profileImageUrl, adminJoinCode } = req.body;

  if (!name || !email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    // Check if user already exists
    const isAlreadyExist = await User.findOne({ email });

    if (isAlreadyExist) {
      return next(errorHandler(400, "User already exists"));
    }

    // Assign role
    let role = "user";

    if (adminJoinCode && adminJoinCode === process.env.ADMIN_JOIN_CODE) {
      role = "admin";
    }

    // Hash password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      profileImageUrl,
      role,
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "Signup successful",
    });
  } catch (error) {
    next(error);
  }
};

// ================= SIGNIN =================
export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(errorHandler(400, "All fields are required"));
    }

    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    }

    // Compare password
    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(400, "Wrong Credentials"));
    }

    // Create token
    const token = jwt.sign(
      { id: validUser._id, role: validUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password: pass, ...rest } = validUser._doc;

    // 🔥 FINAL FIX (TOKEN IN RESPONSE + COOKIE)
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .json({
        success: true,
        ...rest,
        token: token, // ✅ REQUIRED FOR FRONTEND AUTH
      });
  } catch (error) {
    next(error);
  }
};

// ================= USER PROFILE =================
export const userProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(errorHandler(404, "User not found!"));
    }

    const { password: pass, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      ...rest,
    });
  } catch (error) {
    next(error);
  }
};

// ================= UPDATE PROFILE =================
export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(errorHandler(404, "User not found!"));
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await user.save();

    const { password: pass, ...rest } = updatedUser._doc;

    res.status(200).json({
      success: true,
      ...rest,
    });
  } catch (error) {
    next(error);
  }
};

// ================= IMAGE UPLOAD =================
export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(errorHandler(400, "No file uploaded"));
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;

    res.status(200).json({
      success: true,
      imageUrl,
    });
  } catch (error) {
    next(error);
  }
};

// ================= SIGNOUT =================
export const signout = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json({
        success: true,
        message: "User logged out successfully!",
      });
  } catch (error) {
    next(error);
  }
};
