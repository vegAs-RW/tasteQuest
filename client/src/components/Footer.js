import React from "react";
import "../style/Footer.css";
import { BsFacebook, BsInstagram, BsYoutube, BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-social">
        <p>For more tasty ideas follow us !</p>
        <div className="footer-social-icons">
          <BsFacebook className="icons" />
          <BsInstagram className="icons" />
          <BsTwitter className="icons" />
          <BsYoutube className="icons" />
        </div>
      </div>
      <div className="footer-links">
        <p>
          For your health, avoid snacking between meals -{" "}
          <a href="http://mangerbouger.fr">mangerbouger.fr</a>
        </p>
      </div>
      <div className="footer-copyright">
        <p>TasteQuest © 2023</p>
      </div>
    </footer>
  );
};

export default Footer;
