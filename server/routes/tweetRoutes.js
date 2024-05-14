import express from "express";
import {
  createTweet,
  deleteTweet,
  likeOrDislike,
  bookmark,
  showBookmarksOfUser,
  getTweetDetails,
} from "../controllers/tweetController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

//Router Obj
const router = express.Router();

//Create tweets
router.post("/create-tweet", authMiddleware, createTweet);

//Delete tweet
router.delete("/delete-tweet/:id", authMiddleware, deleteTweet);

//Like & dislike
router.put("/like/:id", authMiddleware, likeOrDislike);

//Bookmarks
router.put("/bookmark/:id", authMiddleware, bookmark);

//Show Bookmarks of user
router.get("/show-bookmarks-of-user/:id", authMiddleware, showBookmarksOfUser);

// Get tweet details
router.get("/get-tweet-details", authMiddleware, getTweetDetails);

//Export
export default router;
