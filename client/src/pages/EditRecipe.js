import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserId";
import "./EditRecipe.css";

const EditRecipe = () => {
  const userID = useGetUserID();
  const recipeId = useParams().id;
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [cookingTime, setCookingTime] = useState();

  const fetchRecipe = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/recipes/" + recipeId, { withCredentials: true }
      );
      setTitle(response.data.title);
      setDescription(response.data.description);
      setIngredients(response.data.ingredients);
      setInstructions(response.data.instructions);
      setCookingTime(response.data.cookingTime);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const recipe = {
      title,
      description,
      ingredients,
      instructions,
      cookingTime,
      userId: userID,
    };
    try {
      const response = await axios.put(
        "http://localhost:8000/recipes/" + recipeId,
        recipe,
        { withCredentials: true }
      );
      navigate("/recipes/" + response.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [recipeId]);

  const deleteIngredient = (i) => {
    let updatedIngredient = ingredients.filter((_, index) => index != i);
    setIngredients(updatedIngredient);
  };

  const addIngredient = () => {
    if (ingredient.trim() !== "") {
         let updatedIngredient = [...ingredients];
    updatedIngredient.push(ingredient);
    setIngredient("");
    setIngredients(updatedIngredient);
    }
   
  };
  return (
    <div>
      <Navbar />
      <div className="edit-recipe-container">
        <h1 className="edit-title"> Update you're recipe</h1>
        <form className="edit-recipe-form">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <label htmlFor="ingredients">Ingredients</label>
          <input
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
          />
          <button className="btn" type="button" onClick={addIngredient}>
            Add Ingredient
          </button>
          <div className="ingredients-list">
            {ingredients?.map((ingredient, i) => (
              <div key={i} className="ingredients-list-item">
                <p>{ingredient}</p>
                <p className="delete-button" onClick={() => deleteIngredient(i)}><ImCross/></p>
              </div>
            ))}
          </div>

          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          ></textarea>
          <label htmlFor="cookingTime">Cooking Time (minutes)</label>
          <input
            type="number"
            id="cookingTime"
            name="cookingTime"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
          />
          <button className="btn" onClick={handleUpdate}>Update Recipe</button>
        </form>
      </div>
    </div>
  );
};

export default EditRecipe;
