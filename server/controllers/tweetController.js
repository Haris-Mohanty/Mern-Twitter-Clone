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
