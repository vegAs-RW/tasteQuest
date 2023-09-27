import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <nav className={`navbar-container ${showLinks ? "show-nav" : "hide-nav"}`}>
      <div className="navbar-search">
        <BsSearch className="navbar-search-icon" />
        <input
          className="navbar-search-input"
          placeholder="Search"
          type="text"
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
          <Link to="/myrecipe" className="navbar-link">
            My recipe
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/profile" className="navbar-link">
            Profil
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/login" className="navbar-link">
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
