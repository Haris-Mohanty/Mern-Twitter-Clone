import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//********** USER REGISTRATION ********/
export const registerUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    //Validation
    if (!name || !username || !email || !password) {
      return res.status(422).json({
        success: false,
        message: "Please provide all fields!",
      });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address!",
      });
    }

    // Validate password strength (e.g., minimum length)
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long!",
      });
    }

    //Check existing email
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "The email already exists!",
      });
    }

    //Check existing username
    const existingUsername = await userModel.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: "The username already exists!",
      });
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Register user
    const user = new userModel({
      name,
      username,
      email,
      password: hashedPassword,
    });
    await user.save();

    //success res
    return res.status(201).json({
      success: true,
      message: "User registerd successfully!",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//********** USER LOGIN ********/
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Validation
    if (!email || !password) {
      return res.status(422).json({
        success: false,
        message: "Please provide all fields!",
      });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address!",
      });
    }

    // Validate password strength (e.g., minimum length)
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long!",
      });
    }

    //Check user exist or not
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "Invalid Credentials!",
      });
    }

    //Compare password
    const comparePassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!comparePassword) {
      return res.status(400).json({
        success: false,
        message: "Incorect password, Please check again!",
      });
    }

    //Token Generate
    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    //Success
    return res
      .status(201)
      .cookie("token", token, { expiresIn: "1d", httpOnly: true })
      .json({
        message: "Login Success!",
        success: true,
        token,
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//********** USER LOGOUT ********/
export const logoutUser = (req, res) => {
  try {
    return res.cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
      message: "User Logged out Successfully!",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
