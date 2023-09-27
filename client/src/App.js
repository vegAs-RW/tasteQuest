import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CreateRecipe from "./pages/CreateRecipe";
import Profile from "./pages/Profile";
import UserRecipe from "./pages/UserRecipe";
import Footer from "./components/Footer";
import RecipeDetails from "./pages/RecipeDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Register />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/create" element={<CreateRecipe />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/myrecipe" element={<UserRecipe />} />
          <Route exact path="/recipes/:id" element={<RecipeDetails />} />
        </Routes>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
