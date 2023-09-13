import express from "express";

import { createRecipe,  getAllRecipes, getRecipeDetails, /*saveRecipe, getSavedRecipes,*/ updateRecipe, deleteRecipe, getUserRecipes} from "../controllers/recipe.controller.js";

const router = express.Router();

router.route('/create').post(createRecipe)
router.route('/:id').put(updateRecipe)
router.route('/:id').delete(deleteRecipe)
router.route('/:id').get(getRecipeDetails)
router.route('/').get(getAllRecipes)
router.route('/user/:userId').get(getUserRecipes)
/*router.route('/:id').put(saveRecipe)
router.route('/savedRecipes/:id').get(getSavedRecipes)*/



export { router as recipeRouter };