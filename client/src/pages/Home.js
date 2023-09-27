import React, { useEffect, useState } from "react";
import HomeCards from "../components/HomeCards";
import Navbar from "../components/Navbar";
import HomeBackground from "../components/HomeBackground";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const { search } = useLocation();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/recipes/" + search
        , {withCredentials: true});
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
  }, [search]);
  return (
    <>
      <Navbar />
      <HomeBackground />
      {recipes.map((recipe) => (
        <>
        <Link to={`/recipes/${recipe._id}`}>
          <HomeCards key={recipe._id} recipe={recipe} />
        </Link>
        </>
      ))}
    </>
  );
};

export default Home;
