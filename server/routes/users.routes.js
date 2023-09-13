import express from "express";
import jwt from "jsonwebtoken";

// Import all user controller
import { updateUser, deleteUser, getUser} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/:id").put(updateUser);
router.route("/:id").delete(deleteUser);
router.route("/:id").get(getUser);


export { router as userRouter };




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
