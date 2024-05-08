import mongoose from "mongoose";
import tweetModel from "../models/tweetModel.js";

//************ CREATE TWEET **********/
export const createTweet = async (req, res) => {
  try {
    const { description, id } = req.body;
    //Vaidation
    if (!description || !id) {
      return res.status(422).json({
        success: false,
        message: "Please provide all fields!",
      });
    }

    await tweetModel.create({
      description,
      userId: id,
    });
    return res.status(201).json({
      message: "Tweet Created Successfully!",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      success: false,
      error: err.message,
    });
  }
};

//************ DELETE TWEET **********/
export const deleteTweet = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid tweet ID!",
        success: false,
      });
    }

    //Delete
    const deletedTweet = await tweetModel.findByIdAndDelete(id);
    if (!deletedTweet) {
      return res.status(404).json({
        message: "Tweet not found!",
        success: false,
      });
    }

    //Success
    return res.status(200).json({
      success: true,
      message: "Tweet Deleted Successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      success: false,
      error: err.message,
    });
  }
};

//************ LIKE & DISLIKE **********/
export const likeOrDislike = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const tweetId = req.params.id;
    const tweet = await tweetModel.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({
        message: "Tweet not found",
        success: false,
      });
    }

    if (tweet.like.includes(loggedInUserId)) {
      //dislike
      await tweetModel.findByIdAndUpdate(tweetId, {
        $pull: { like: loggedInUserId },
      });
      return res.status(200).json({
        message: "User disliked your tweet!",
        success: true,
      });
    } else {
      //like
      await tweetModel.findByIdAndUpdate(tweetId, {
        $push: { like: loggedInUserId },
      });
      return res.status(200).json({
        message: "User liked your tweet!",
        success: true,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      success: false,
      error: err.message,
    });
  }
};

//************** BOOKMARK ******************/
export const bookmark = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const tweetId = req.params.id;
    const tweet = await tweetModel.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({
        message: "Tweet not found",
        success: false,
      });
    }

    if (tweet.bookmarks.includes(loggedInUserId)) {
      // Remove from bookmark
      await tweetModel.findByIdAndUpdate(tweetId, {
        $pull: { bookmarks: loggedInUserId },
      });
      return res.status(200).json({
        message: "Removed from bookmark successfully!",
      });
    } else {
      // add to bookmark
      await tweetModel.findByIdAndUpdate(tweetId, {
        $push: { bookmarks: loggedInUserId },
      });
      return res.status(200).json({
        message: "Add to bookmark successfully!",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//********** SHOW BOOKMARK OF USER *************/
export const showBookmarksOfUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Get Bookmarks
    const bookmarks = await tweetModel.find({ bookmarks: id });

    if (!bookmarks || bookmarks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Bookmark Found!",
      });
    }

    //Success
    return res.status(200).json({
      success: true,
      bookmarks,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
