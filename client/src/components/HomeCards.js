import React from "react";
import { BiTimeFive } from "react-icons/bi";
import { LuChefHat } from "react-icons/lu";
import "../style/HomeCards.css";


const HomeCards = ({ recipe }) => {
  return (
    
      <article className="card-container">
        <div className="card-img">
          <img
            src={recipe.imageUrl ? `http://localhost:8000/images/${recipe.imageUrl}` : "null"}
            alt={recipe.title}
          ></img>
        </div>
        <div className="card-infos">
          <div className="card-infos-title">
            <h3>{recipe.title}</h3>
          </div>
          <div className="card-infos-items">
            <div className="card-infos-items-item">
              <BiTimeFive />
              <p>{recipe.cookingTime}min</p>
            </div>
            <div className="card-infos-items-item">
              <LuChefHat />
              <p>{recipe.description.slice(0, 40) + "...More"}</p>
            </div>
          </div>
        </div>
      </article>

  );
};

export default HomeCards;
