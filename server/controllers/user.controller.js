import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/user.model.js";

// Get all users
const getAllUsers = async (req, res) => {};

// Create a user when is register
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await UserModel.findOne({ username, email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      username,
      password: hashedPassword,
      email,
    });
    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Connect the user when is signin
const connectedUser = async (req, res) => {
  const { username, password, email } = req.body;

  const user = await UserModel.findOne({ username, email });

  if (!user) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }
  const token = jwt.sign({ id: user._id }, "secret");
  res.status(200).json({ token, userID: user._id });
};

// Get all the user info
const getUserInfo = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findOne({ _id: id })
      .populate("allRecipes")
      .populate("savedRecipes");

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllUsers, createUser, getUserInfo, connectedUser };
