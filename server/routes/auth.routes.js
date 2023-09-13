import express from "express";

// Import all user controller
import { createUser, loginUser, logoutUser} from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);

export { router as authRouter };

