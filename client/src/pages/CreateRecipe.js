import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserId";
import Navbar from "../components/Navbar";
import "../style/CreateRecipe.css";

const CreateRecipe = () => {
  const navigate = useNavigate();

  const userID = useGetUserID();

  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: null,
    cookingTime: 0,
    userId: userID,
  });
  const [error, setError] = useState(null);

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

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    setRecipe({ ...recipe, imageUrl: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recipe.imageUrl) {
      setError("Image is required");
      return;
    }
    const formData = new FormData();
    formData.append("title", recipe.title);
    formData.append("description", recipe.description);
    formData.append("instructions", recipe.instructions);
    formData.append("cookingTime", recipe.cookingTime);
    formData.append("userId", recipe.userId);
    recipe.ingredients.forEach((ingredient, index) => {
      formData.append(`ingredients[${index}]`, ingredient);
    });
    formData.append("image", recipe.imageUrl);
    try {
      await axios.post("http://localhost:8000/recipes/create", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!userID) navigate("/login");
  }, []);
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

          <button className="btn" type="button" onClick={handleAddIngredient}>
            Add Ingredient
          </button>
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
          ></textarea>
          <label htmlFor="imageUrl">Image</label>
          <input
            type="file"
            id="imageUrl"
            name="imageUrl"
            accept="image/*"
            onChange={handleImgChange}
          />
          {error && <p className="error-message">{error}</p>}

          <label htmlFor="cookingTime">Cooking Time (minutes)</label>
          <input
            type="number"
            id="cookingTime"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
          />
          <button className="btn" type="submit">
            Create Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
