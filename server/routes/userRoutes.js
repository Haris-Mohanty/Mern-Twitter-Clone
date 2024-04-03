import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  bookmark,
  getProfileDetails,
  getOtherUsers,
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

//Get Profile details
router.get("/get-profile/:id", authMiddleware, getProfileDetails);

//Get Other users
router.get("/other-users/:id", authMiddleware, getOtherUsers);

//Export
export default router;
