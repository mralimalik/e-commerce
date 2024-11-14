import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const createToken = (userData) => {
  try {
    // Generate token after user creation
    const token = jwt.sign(
      { email: userData.email, _id: userData._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    return token;
  } catch (e) {
    console.log("error creating user token", e);
    return null;
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("Register body ", req.body);

    // Validate input data
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user and save
    const newUser = new User({ name, email, password });
    await newUser.save().then((response) => {
      // Generate token after user creation
      const token = createToken(newUser);

      if (!token) {
        return res.status(500).json({ message: "Error generating token" });
      }

      // Send response with user data and token
      res.status(200).json({ user: newUser, token });
    });
  } catch (e) {
    console.log("Error registering user ", e);
  }
};

const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input data
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email, and password are required." });
    }
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Verify password
    const isPasswordCorrect = await existingUser.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate token after successful login
    const token = createToken(existingUser);

    if (!token) {
      return res.status(500).json({ message: "Error generating token" });
    }
    // Send response with user data and token
    res.status(200).json({ user: existingUser, token });
  } catch (e) {
    console.log("Error in login user", e);
  }
};

export { registerUser, logInUser };
