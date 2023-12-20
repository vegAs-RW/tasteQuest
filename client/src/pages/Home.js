import React, { useEffect, useState } from "react";
import HomeCards from "../components/HomeCards";
import Navbar from "../components/Navbar";
import HomeBackground from "../components/HomeBackground";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const { search } = useLocation();
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/recipes/" + search
        , {withCredentials: true});
        setRecipes(response.data);
      } catch (err) {
        navigate("/login")
        console.log(err);
      }
    };

    fetchRecipes();
  }, [search]);
  return (
    <>
      <Navbar />
      <HomeBackground />
      <main>
      <div className="home">
      {recipes.map((recipe) => (
        <div className="card" key={recipe._id}>
        <Link to={`/recipes/${recipe._id}`}>
          <HomeCards  recipe={recipe} />
        </Link>
        </div>
      ))}
      </div>
      </main>
    </>
  );
};

export default Home;
