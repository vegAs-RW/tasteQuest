import React from "react";
import "./Footer.css";
import { BsFacebook, BsInstagram, BsYoutube, BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="footer-container">
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
        <a href="#" className="link">
          Contact
        </a>
        <a href="#" className="link">
          Preference
        </a>
        <a href="#" className="link">
          Legal mention
        </a>
      </div>
      <div className="footer-copyright">
        <p>TasteQuest © 2023</p>
      </div>
    </div>
  );
};

export default Footer;
