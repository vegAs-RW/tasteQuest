import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/user.model.js";
import { RecipesModel } from "../models/recipes.model.js";


// Update
const updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10)
      req.body.password = await bcrypt.hash(req.body.password, salt)
    }
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, {$set: req.body},{new: true})
    res.status(200).json(updatedUser)
  } catch (err) {
    res.status(500).json(err)
  }
}

// Delete
const deleteUser = async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id)
    await RecipesModel.deleteMany({userId: req.params.id})
    res.status(200).json({message: "User has been deleted!"})
  } catch (err) {
    res.status(500).json(err)
  }
}

// Get User
const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id)
    const {password, isAdmin, ...info} = user._doc
    res.status(200).json({...info, isAdmin})
  } catch (err) {
    res.status(500).json(err)
  }
}


export { updateUser, deleteUser, getUser };
