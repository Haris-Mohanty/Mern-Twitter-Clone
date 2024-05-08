import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getProfileDetails,
  getOtherUsers,
  followUser,
  unFollow,
  getAllTweets,
  getFollowingTweets,
  searchUserByName,
  addBio,
  totalPostOfUser,
  updateUserProfile,
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

//Get Profile details
router.get("/get-profile/:id", authMiddleware, getProfileDetails);

//Get Other users
router.get("/other-users/:id", authMiddleware, getOtherUsers);

// Follow
router.post("/follow/:id", authMiddleware, followUser);

// Unfollow
router.post("/unfollow/:id", authMiddleware, unFollow);

//Get tweets (loggedIn user + Following user)
router.get("/get-tweets/:id", authMiddleware, getAllTweets);

//Get following tweets
router.get("/following-tweets/:id", authMiddleware, getFollowingTweets);

//Search User By Name
router.get("/search-user", authMiddleware, searchUserByName);

//Add Bio
router.post("/add-bio/:id", authMiddleware, addBio);

//Total post of user
router.get("/totalPost/:id", authMiddleware, totalPostOfUser);

//Update Profile
router.put("/update-profile/:id", authMiddleware, updateUserProfile);

//Export
export default router;
