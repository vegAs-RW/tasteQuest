import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import "../style/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserId";
import axios from "axios";

const Navbar = () => {
  const userID = useGetUserID()
  const [search,setSearch]=useState("")
  const [showLinks, setShowLinks] = useState(false);
  const navigate = useNavigate();

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

  const handleLogout = async () => {
    try {
      // Envoyez une requête GET à la route de déconnexion côté serveur
      await axios.get("http://localhost:8000/auth/logout", { withCredentials: true });

      // Effacez le localStorage
      localStorage.clear();

      // Redirigez l'utilisateur vers la page de connexion ou une autre page appropriée après la déconnexion
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className={`navbar-container ${showLinks ? "show-nav" : "hide-nav"}`}>
      <div className="navbar-search">
        <BsSearch onClick={() =>navigate(search?"?search="+search:navigate("/"))} className="navbar-search-icon" />
        <input
          className="navbar-search-input"
          placeholder="Search"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
        ></input>
      </div>
      <h1 className="navbar-title">TasteQuest</h1>
      <ul className="navbar-links">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/create" className="navbar-link">
            Create Recipe
          </Link>
        </li>
        <li className="navbar-item">
          <Link to={"/myrecipes/"+userID} className="navbar-link">
            My recipe
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/login" className="navbar-link" onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </ul>
      <button className="navbar-burger" onClick={handleShowLinks}>
        <span className="burger-line"></span>
      </button>
    </nav>
  );
};

export default Navbar;
