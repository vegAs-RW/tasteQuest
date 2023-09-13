import express from "express";

// Import all user controller
import { updateUser, deleteUser, getUser} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";


const router = express.Router();

router.route("/:id").put(verifyToken, updateUser);
router.route("/:id").delete(verifyToken, deleteUser);
router.route("/:id").get(verifyToken, getUser);


export { router as userRouter };





