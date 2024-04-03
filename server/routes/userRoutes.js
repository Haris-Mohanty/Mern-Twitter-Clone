import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  bookmark,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

//Router Obj
const router = express.Router();

//Create routes
//Register
router.post("/register", registerUser);

//Login
router.post("/login", loginUser);

//Logout
router.get("/logout", logoutUser);

//Bookmarks
router.put("/bookmark/:id", authMiddleware, bookmark);

//Export
export default router;
