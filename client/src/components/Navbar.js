import React, {useState} from 'react';
import {BsSearch} from 'react-icons/bs'
import './Navbar.css'

const Navbar = () => {

    const [showLinks, setShowLinks] = useState(false)

    const handleShowLinks = () => {
        setShowLinks(!showLinks)
    }

    return (
        <nav className={`navbar-container ${showLinks ? "show-nav" : "hide-nav"}`}>
            <div className='navbar-search'>
                <p><BsSearch className='navbar-search-icon'/></p>
                <input className='navbar-search-input' placeholder='Search' type='text'></input>
            </div>
            <h1 className='navbar-title'>TasteQuest</h1>
            <ul className='navbar-links'>
                <li className='navbar-item'>
                    <a href='/'className='navbar-link'>Home</a>
                </li>
                <li className='navbar-item'>
                    <a href='/'className='navbar-link'>Create Recipe</a>
                </li>
                <li className='navbar-item'>
                    <a href='/'className='navbar-link'>My recipe</a>
                </li>
                <li className='navbar-item'>
                    <a href='/'className='navbar-link'>Profil</a>
                </li>
                <li className='navbar-item'>
                    <a href='/'className='navbar-link'>Logout</a>
                </li>
            </ul>
            <button className='navbar-burger' onClick={handleShowLinks}>
                <span className='burger-line'></span>
            </button>
            
        </nav>
    );
};

export default Navbar;