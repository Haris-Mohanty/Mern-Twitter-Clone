import express from "express";
import {
  createTweet,
  deleteTweet,
  likeOrDislike,
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

//Export
export default router;
