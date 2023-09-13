import express from "express";
import jwt from "jsonwebtoken";

// Import all user controller
import { createUser, loginUser, logoutUser} from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);

export { router as authRouter };


export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, process.env.SECRET_KEY, (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
