import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post("http://localhost:8000/auth/login", {
        email,
        password,
      },
      {withCredentials: true});
      console.log(result.headers.cookie);
      window.localStorage.setItem("userID", result.data.userID);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1>TasteQuest</h1>
      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Login</h2>
          <p>Happy to see you again !</p>
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
            Login
          </button>
        </form>
        <p className="switch-login" onClick={() => navigate("/signup")}>
          You don't have an account ? Click here !
        </p>
      </div>
    </>
  );
};

export default Login;
