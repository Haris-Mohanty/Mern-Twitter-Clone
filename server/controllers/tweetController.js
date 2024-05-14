import mongoose from "mongoose";
import tweetModel from "../models/tweetModel.js";
import userModel from "../models/userModel.js";

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

    // Get Followers for send notifications
    const loggedInUser = await userModel.findById(id);
    const followersOfLoggedInUser = [...loggedInUser.followers];

    // Tweet Create
    await tweetModel.create({
      description,
      userId: id,
    });

    //Push notifications to all followers
    for (const followerId of followersOfLoggedInUser) {
      const followersDetails = await userModel.findById(followerId);
      if (followersDetails) {
        // Create  notifications
        const notifications = {
          type: "new-tweet",
          data: { loggedInUser },
          message: `${loggedInUser.name} posted a new tweet`,
          onClickPath: "/tweet",
        };

        // Add the notifications to the follower's unSeenNotifications array
        followersDetails.unSeenNotifications.push(notifications);

        // Update the user
        await followersDetails.save();
      }
    }

    // Success Res
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
    const tweet = await tweetModel.findById(tweetId).populate("userId");
    if (!tweet) {
      return res.status(404).json({
        message: "Tweet not found",
        success: false,
      });
    }

    // Get logged in user details
    const loggedInUser = await userModel.findById(loggedInUserId);

    if (tweet.like.includes(loggedInUserId)) {
      //---------- Dislike --------/
      await tweetModel.findByIdAndUpdate(tweetId, {
        $pull: { like: loggedInUserId },
      });
      const unSeenNotifications = tweet.userId.unSeenNotifications;
      unSeenNotifications.push({
        type: "dislike-tweet",
        data: { loggedInUser },
        message: `${loggedInUser.name} disliked your tweet`,
        onClickPath: "/tweet",
      });
      await userModel.findByIdAndUpdate(tweet.userId._id, {
        unSeenNotifications,
      });

      return res.status(200).json({
        message: "User disliked your tweet!",
        success: true,
      });
    } else {
      //---------- like --------/
      await tweetModel.findByIdAndUpdate(tweetId, {
        $push: { like: loggedInUserId },
      });
      const unSeenNotifications = tweet.userId.unSeenNotifications;
      unSeenNotifications.push({
        type: "like-tweet",
        data: { loggedInUser },
        message: `${loggedInUser.name} liked your tweet`,
        onClickPath: "/tweet",
      });
      await userModel.findByIdAndUpdate(tweet.userId._id, {
        unSeenNotifications,
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

    // Get tweet details
    const tweet = await tweetModel.findById(tweetId).populate("userId");
    if (!tweet) {
      return res.status(404).json({
        message: "Tweet not found",
        success: false,
      });
    }

    // Get logged in user details
    const loggedInUser = await userModel.findById(loggedInUserId);

    if (tweet.bookmarks.includes(loggedInUserId)) {
      //------------ Remove from bookmark -------------//
      await tweetModel.findByIdAndUpdate(tweetId, {
        $pull: { bookmarks: loggedInUserId },
      });
      return res.status(200).json({
        message: "Removed from bookmark successfully!",
      });
    } else {
      // --------- add to bookmark ----------//
      await tweetModel.findByIdAndUpdate(tweetId, {
        $push: { bookmarks: loggedInUserId },
      });

      //--------- push notifications --------//
      const unSeenNotifications = tweet.userId.unSeenNotifications;
      unSeenNotifications.push({
        type: "dislike-tweet",
        data: { loggedInUser },
        message: `${loggedInUser.name} bookmarked your tweet`,
        onClickPath: "/bookmark",
      });
      await userModel.findByIdAndUpdate(tweet.userId._id, {
        unSeenNotifications,
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

//********** GET TWEET DETAILS *************/
export const getTweetDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const tweet = await tweetModel.findById(id).populate("userId");
    if (!tweet) {
      return res.status(404).json({
        success: false,
        message: "Tweet not found!",
      });
    }

    return res.status(200).json({
      success: true,
      tweet,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
