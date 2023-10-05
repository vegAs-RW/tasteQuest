import React from "react";
import { BiTimeFive } from "react-icons/bi";
import { LuChefHat } from "react-icons/lu";
import "./HomeCards.css";


const HomeCards = ({ recipe }) => {
  return (
    
      <div className="card-container">
        <div className="card-img">
          <img
            src={recipe.imageUrl ? `http://localhost:8000/images/${recipe.imageUrl}` : "null"}
            alt={recipe.title}
            className=""
          ></img>
        </div>
        <div className="card-infos">
          <div className="card-infos-title">
            <h3 className="">{recipe.title}</h3>
          </div>
          <div className="card-infos-items">
            <div className="card-infos-items-item">
              <BiTimeFive />
              <p>{recipe.cookingTime}</p>
            </div>
            <div className="card-infos-items-item">
              <LuChefHat />
              <p>{recipe.description.slice(0, 100) + "...More"}</p>
            </div>
          </div>
        </div>
      </div>

  );
};

export default HomeCards;
