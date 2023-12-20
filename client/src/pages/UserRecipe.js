import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HomeCards from "../components/HomeCards";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserId";
import "../style/UserRecipe.css";

const UserRecipe = () => {
  const { search } = useLocation();
  const [recipes, setRecipes] = useState([]);
  const userID = useGetUserID();
  const [noResults, setNoResults] = useState(false);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/recipes/user/" + userID,
        { withCredentials: true }
      );
      setRecipes(response.data);
      if (response.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [search]);

  return (
    <>
      <Navbar />
      <section>
        <header>
          <h1>Your recipes</h1>
        </header>
        <div className="user-recipe-container">
          {!noResults ? (
            recipes?.map((recipe) => (
              <div className="card" key={recipe._id}>
                <Link to={userID ? `/recipes/${recipe._id}` : "/login"}>
                  <HomeCards recipe={recipe} />
                </Link>
              </div>
            ))
          ) : (
            <h3>You have no recipes</h3>
          )}
        </div>
      </section>
    </>
  );
};

export default UserRecipe;
