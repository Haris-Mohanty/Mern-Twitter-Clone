import express from "express";
import { registerUser } from "../controllers/userController.js";

//Router Obj
const router = express.Router();

//Create routes
router.post("/register", registerUser);

//Export
export default router;
