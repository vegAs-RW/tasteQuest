import { RecipesModel } from "../models/recipes.model.js";
/*import { UserModel } from "../models/user.model.js";*/

// Get recipes
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await RecipesModel.find();
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Create
const createRecipe = async (req, res) => {
  const {
    title,
    description,
    cookingTime,
    instructions,
    ingredients,
    imageUrl,
    userId,
  } = req.body;

  const newRecipe = new RecipesModel({
    title,
    description,
    cookingTime,
    instructions,
    ingredients,
    imageUrl,
    userId,
  });

  try {
    await newRecipe.save();
    res.status(201).json({ message: "Recipe created", newRecipe });
  } catch (err) {
    res.status(500).json({ message: "Error recipe not created" });
  }
};

// update
const updateRecipe = async (req, res) => {
  try {
    const updateRecipe = await RecipesModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateRecipe);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete
const deleteRecipe = async (req, res) => {
  try {
    await RecipesModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Recipe successfully deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get recipe details
const getRecipeDetails = async (req, res) => {
  try {
    const recipe = await RecipesModel.findById(req.params.id);
    res.status(200).json(recipe);
  } catch (err) {
    res.status(400).json({ message: "Recipe not found" });
  }
};

// Get user recipes
const getUserRecipes = async (req, res) => {
  try {
    const userRecipes = await RecipesModel.find({ userId: req.params.userId });
    if (!userRecipes) {
      res.status(404).json({ message: "il n'y a pas de recette" });
    }
    res.status(200).json(userRecipes);
  } catch (err) {
    res.status(500).json(err);
  }
};
/*
const saveRecipe = async (req, res) => {
  const recipe = await RecipesModel.findById(req.body.recipeID);
  const user = await UserModel.findById(req.body.userID);

  try {
    user.savedRecipes.push(recipe);
    await user.save();
    res.status(201).json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSavedRecipes = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    const savedRecipes = await RecipesModel.find({
      _id: { $in: user.savedRecipes },
    });
    console.log(savedRecipes);
    res.status(201).json({ savedRecipes });
  } catch (err) {
    res.status(500).json(err);
  }
};
*/
export {
  getAllRecipes,
  getRecipeDetails,
  /*getSavedRecipes,
  saveRecipe,*/
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getUserRecipes,
};
