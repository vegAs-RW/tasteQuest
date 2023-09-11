import express from "express";
import jwt from "jsonwebtoken";

// Import all user controller
import { createUser, getUserInfo, connectedUser} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/register").post(createUser);
router.route("/login").post(connectedUser);
router.route("/:id").get(getUserInfo);

export { router as userRouter };




export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, "secret", (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
