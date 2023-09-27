import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserId";
import Navbar from "../components/Navbar";
import "./CreateRecipe.css";

const CreateRecipe = () => {
  const navigate = useNavigate();

  const userID = useGetUserID();

  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userId: userID,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (e, i) => {
    const { value } = e.target;
    const ingredients = [...recipe.ingredients];
    ingredients[i] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/recipes/create",
        { ...recipe },
        {
          withCredentials: true,
        }
      );

      alert("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="create-recipe-container">
        <h2 className="create-recipe-title">Share you're recipe</h2>
        <form className="create-recipe-form" onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={recipe.title}
            onChange={handleChange}
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={recipe.description}
            onChange={handleChange}
          ></textarea>
          <label htmlFor="ingredients">Ingredients</label>
          {recipe.ingredients.map((ingredient, i) => (
            <input
              key={i}
              type="text"
              name="ingredients"
              value={ingredient}
              onChange={(e) => handleIngredientChange(e, i)}
            />
          ))}

          <button type="button" onClick={handleAddIngredient}>
            Add Ingredient
          </button>
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
          ></textarea>
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={recipe.imageUrl}
            onChange={handleChange}
          />
          <label htmlFor="cookingTime">Cooking Time (minutes)</label>
          <input
            type="number"
            id="cookingTime"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
          />
          <button type="submit">Create Recipe</button>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
