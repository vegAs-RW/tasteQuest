import express from "express";

import { createRecipe,  getAllRecipes, getOneRecipe, saveRecipe, getSavedRecipes} from "../controllers/recipe.controller.js";

const router = express.Router();

router.route('/').post(createRecipe)
router.route('/').get(getAllRecipes)
router.route('/:id').get(getOneRecipe)
router.route('/:id').put(saveRecipe)
router.route('/savedRecipes/:id').get(getSavedRecipes)


export { router as recipeRouter };