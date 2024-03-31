import express from "express";
import { createTweet, deleteTweet } from "../controllers/tweetController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

//Router Obj
const router = express.Router();

//Create tweets
router.post("/create-tweet", authMiddleware, createTweet);

//Delete tweet
router.delete("/delete-tweet", authMiddleware, deleteTweet);

//Export
export default router;
