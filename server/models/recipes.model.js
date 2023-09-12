import mongoose from "mongoose";


const RecipeSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: {type: String, required: true},
    cookingTime: { type: Number, required: true},
    instructions: { type: String, required: true },
    ingredients: [{ type: String, required: true}],
    imageUrl: { type: String, required: true },
    userOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  });
  
  export const RecipesModel = mongoose.model("Recipes", RecipeSchema);