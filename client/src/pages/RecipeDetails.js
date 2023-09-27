import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { LuChefHat } from "react-icons/lu";
import Navbar from "../components/Navbar";

import "./RecipeDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserId";
import Footer from "../components/Footer";

const RecipeDetails = () => {
  const userId = useGetUserID()
  const recipeId = useParams().id;
  const [recipe, setRecipe] = useState({});
  const navigate = useNavigate();

  const fetchRecipe = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/recipes/" + recipeId
      ,{withCredentials: true});
      console.log(response.data);
      setRecipe(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteRecipe=async ()=>{

    try{
      const response = await axios.delete("http://localhost:8000/recipes/"+recipeId,{withCredentials:true})
      console.log(response.data)
      navigate("/")
    }
    catch(err){
      console.log(err)
    }

  }
  useEffect(() => {
    fetchRecipe();
  }, [recipeId]);
  return (
    <>
      <Navbar />
      <div className="recipe-container">
        <div className="recipe-items">
          <h2 className="recipe-title">{recipe.title}</h2>
          <p>
            <LuChefHat />
            {recipe.cookingTime}
          </p>
          <div className="recipe-item">
            <p>
              <BiEdit />
            </p>
            {userId===recipe.userId && 
            <p onClick={handleDeleteRecipe}>
              <MdDelete />
            </p>
            }
            
          </div>
        </div>
        <img
          src={recipe.imageUrl}
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
      <Footer/>
    </>
  );
};

export default RecipeDetails;
