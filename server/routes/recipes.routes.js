import express from "express";

import {
  createRecipe,
  getAllRecipes,
  getRecipeDetails,
  /*saveRecipe, getSavedRecipes,*/ updateRecipe,
  deleteRecipe,
  getUserRecipes,
} from "../controllers/recipe.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.route("/create").post(verifyToken, createRecipe);
router.route("/:id").put(verifyToken, updateRecipe);
router.route("/:id").delete(verifyToken, deleteRecipe);
router.route("/:id").get(verifyToken, getRecipeDetails);
router.route("/").get(verifyToken, getAllRecipes);
router.route("/user/:userId").get(verifyToken, getUserRecipes);
/*router.route('/:id').put(saveRecipe)
router.route('/savedRecipes/:id').get(getSavedRecipes)*/

export { router as recipeRouter };
