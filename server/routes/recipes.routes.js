import express from "express";

import {
  createRecipe,
  getAllRecipes,
  getRecipeDetails,
  updateRecipe,
  deleteRecipe,
  getUserRecipes,
} from "../controllers/recipe.controller.js";
import { verifyToken } from "../utils/verifyToken.js";
import {uploadMiddleware} from "../utils/multer-config.js"

const router = express.Router();

router.route("/create").post(verifyToken, uploadMiddleware, createRecipe);
router.route("/:id").put(verifyToken, updateRecipe);
router.route("/:id").delete(verifyToken, deleteRecipe);
router.route("/:id").get(verifyToken, getRecipeDetails);
router.route("/").get(verifyToken, getAllRecipes);
router.route("/user/:userId").get(verifyToken, getUserRecipes);

export { router as recipeRouter };
