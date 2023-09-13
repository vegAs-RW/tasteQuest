import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/user.model.js";


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
    res.status(200).json({ message: "User registered successfully", newUser});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login
const loginUser = async (req, res) => {
  const { password, email } = req.body;

  const user = await UserModel.findOne({ email });

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
  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {expiresIn: "1d"});
  res.cookie("token", token).status(200).json({message: "Succesfully Login" , token, userID: user._id})
};

// Logout
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {sameSite: "none", secure: true}).status(200).json({message : "User succesfully logout"})
  } catch (err) {
    res.status(500).json(err)
  }
}

export { createUser, loginUser, logoutUser };
