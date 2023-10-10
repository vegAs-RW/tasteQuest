import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiEdit, BiTimeFive } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Navbar from "../components/Navbar";

import "../style/RecipeDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserId";

const RecipeDetails = () => {
  const userId = useGetUserID();
  const recipeId = useParams().id;
  const [recipe, setRecipe] = useState({});
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const fetchRecipe = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/recipes/" + recipeId,
        { withCredentials: true }
      );
      setRecipe(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user/" + userId, {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteRecipe = async () => {
    try {
      await axios.delete("http://localhost:8000/recipes/" + recipeId, {
        withCredentials: true,
      });
      alert("Recipe successfuly deleted");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchRecipe();
    fetchUser();
  }, [recipeId]);
  return (
    <>
      <Navbar />
      <div className="recipe-container">
        <div className="recipe-items">
          <h2 className="recipe-title">{recipe.title}</h2>
          <p>
            <BiTimeFive />
            {recipe.cookingTime}min
          </p>
          {(userId === recipe.userId || (user && user.isAdmin)) && (
            <div className="recipe-item">
              <p onClick={() => navigate("/edit/" + recipeId)}>
                <BiEdit />
              </p>

              <p onClick={handleDeleteRecipe}>
                <MdDelete />
              </p>
            </div>
          )}
        </div>
        <img
          src={
            recipe.imageUrl
              ? `http://localhost:8000/images/${recipe.imageUrl}`
              : "null"
          }
          alt={recipe.title}
          className="recipe-img"
        ></img>
        <p className="recipe-description">{recipe.description}</p>
        <div className="recipe-ingredients">
          <h4>Ingredients</h4>
          <div className="recipe-ingredient">
            {recipe.ingredients?.map((ingredient, i) => (
              <p key={i}>{ingredient}</p>
            ))}
          </div>
        </div>
        <div className="recipe-instructions">
          <h4>Instructions</h4>
          <p className="recipe-instruction">{recipe.instructions}</p>
        </div>
      </div>
    </>
  );
};

export default RecipeDetails;
