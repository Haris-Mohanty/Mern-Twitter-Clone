import express from "express";
import { createTweet } from "../controllers/tweetController.js";

//Router Obj
const router = express.Router();

//Create tweets
router.post("/create-tweet", createTweet);

//Export
export default router;
