import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      console.log("userLogin hit was successful");
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("userLogin hit was successful");
      return res.json({ success: false, message: "Invalid credentials " });
    }

    const token = createToken(user._id);
    console.log("userLogin hit was successful");
    res.json({ success: true, token });
  } catch (error) {
    console.log("userLogin hit was unsuccessful");
    console.log(error);
    res.json({ success: false, message: "Error in logining  user" });
  }
};

// create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // checking if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      console.log("userRegister hit was successful");
      return res.json({ success: false, message: "User already exists" });
    }

    // validating email format and strong password
    if (!validator.isEmail(email)) {
      console.log("userRegister hit was successful");
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      console.log("userRegister hit was successful");
      return res.json({
        success: false,
        message: "Please enter strong password",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // creating new user
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    console.log("userRegister hit was successful");
    res.json({ success: true, token });
  } catch (error) {
    console.log("userRegister hit was unsuccessful");
    console.log(error);
    res.json({ success: false, message: "Error in registering user" });
  }
};

export { loginUser, registerUser };
