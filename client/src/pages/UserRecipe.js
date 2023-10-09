import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HomeCards from "../components/HomeCards";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserId";

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
    <div>
      <Navbar />
      <h2>Your recipes</h2>
      <div className="">
        {!noResults ? (
          recipes?.map((recipe) => (
            <Link
              to={userID ? `/recipes/${recipe._id}` : "/login"}
              key={recipe._id}
            >
              <HomeCards recipe={recipe} />
            </Link>
          ))
        ) : (
          <h3>You have no recipes</h3>
        )}
      </div>
    </div>
  );
};

export default UserRecipe;
