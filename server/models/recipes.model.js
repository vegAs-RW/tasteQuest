import mongoose from "mongoose";

const RecipeSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  cookingTime: { type: Number, required: true },
  instructions: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  imageUrl: { type: String, required: false },
  userId: { type: String, required: true},
},{timestamps: true});

export const RecipesModel = mongoose.model("Recipes", RecipeSchema);
