import tweetModel from "../models/tweetModel.js";

export const createTweet = async (req, res) => {
  try {
    const { description, id } = req.body;
    //Vaidation
    if (!description || !userId) {
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
