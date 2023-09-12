import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    unit: String
});

const RecipeSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: {type: String, required: true},
    cookingTime: { type: Number, required: true},
    servings: { type: Number, required: true },
    instructions: { type: String, required: true },
    tips: { type: String, required: true },
    ingredients: [IngredientSchema],
    imageUrl: { type: String, required: true },
    userOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  });
  
  export const RecipesModel = mongoose.model("Recipes", RecipeSchema);