import express from "express";
import { createTweet } from "../controllers/tweetController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

//Router Obj
const router = express.Router();

//Create tweets
router.post("/create-tweet", authMiddleware, createTweet);

//Export
export default router;
