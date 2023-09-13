import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import Footer from "../components/Footer";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/auth/register", {
        username,
        password,
        email,
      });
      alert("Registration Completed! Now login.");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Sign Up</h2>
          <p>Join our community !</p>
          <div className="form-group">
            <input
              className="form-input"
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-input"
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-input"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn">
            Register
          </button>
        </form>
        <p className="switch-login" onClick={() => navigate("/login")}>
          You already have an account ? Click here !
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Register;
