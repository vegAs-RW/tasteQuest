import React from "react";
import {BiTimeFive} from 'react-icons/bi'
import {LuChefHat} from 'react-icons/lu'
import './HomeCards.css'


const HomeCards = () => {
  return (
    <>
    <div className="card-container">
      <div className="card-img">
        <img src="https://www.allrecipes.com/thmb/BNqpgaMRwuHhuhtdw-E4rMpJm4Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/11973-spaghetti-carbonara-ii-DDMFS-4x3-6edea51e421e4457ac0c3269f3be5157.jpg" alt="" className=""></img>
      </div>
      <div className="card-infos">
        <div className="card-infos-title">
          <h3 className="">Spaghetti Carbonara</h3>
        </div>
        <div className="card-infos-items">
            <div className="card-infos-items-item">
                <BiTimeFive />
                <p>15 min</p>
            </div>
            <div className="card-infos-items-item">
                <LuChefHat />
                <p>Easy</p>
            </div>
        </div>
      </div>
    </div>
<div className="card-container">
<div className="card-img">
  <img src="https://www.allrecipes.com/thmb/BNqpgaMRwuHhuhtdw-E4rMpJm4Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/11973-spaghetti-carbonara-ii-DDMFS-4x3-6edea51e421e4457ac0c3269f3be5157.jpg" alt="" className=""></img>
</div>
<div className="card-infos">
  <div className="card-infos-title">
    <h3 className="">Spaghetti Carbonara</h3>
  </div>
  <div className="card-infos-items">
      <div className="card-infos-items-item">
          <BiTimeFive />
          <p>15 min</p>
      </div>
      <div className="card-infos-items-item">
          <LuChefHat />
          <p>Easy</p>
      </div>
  </div>
</div>
</div>
</>
  );
};

export default HomeCards;
