import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import tweetModel from "../models/tweetModel.js";

//********** USER REGISTRATION ********/
export const registerUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    //Validation
    if (!name || !username || !email || !password) {
      return res.status(422).json({
        success: false,
        message: "Please provide all fields!",
      });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address!",
      });
    }

    // Validate password strength (e.g., minimum length)
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long!",
      });
    }

    //Check existing email
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "The email already exists!",
      });
    }

    //Check existing username
    const existingUsername = await userModel.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: "The username already exists!",
      });
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Register user
    const user = new userModel({
      name,
      username,
      email,
      password: hashedPassword,
    });
    await user.save();

    //success res
    return res.status(201).json({
      success: true,
      message: "User registerd successfully!",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//********** USER LOGIN ********/
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Validation
    if (!email || !password) {
      return res.status(422).json({
        success: false,
        message: "Please provide all fields!",
      });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address!",
      });
    }

    // Validate password strength (e.g., minimum length)
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long!",
      });
    }

    //Check user exist or not
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "Invalid Credentials!",
      });
    }

    //Compare password
    const comparePassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!comparePassword) {
      return res.status(400).json({
        success: false,
        message: "Incorect password, Please check again!",
      });
    }

    //Token Generate
    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    //Success
    return res
      .status(201)
      .cookie("token", token, { expiresIn: "1d", httpOnly: true })
      .json({
        message: "Login Success!",
        success: true,
        user: existingUser,
        token,
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//********** USER LOGOUT ********/
export const logoutUser = (req, res) => {
  try {
    return res.cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
      message: "User Logged out Successfully!",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//********** BOOKMARK ********/
export const bookmark = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const tweetId = req.params.id;
    const user = await userModel.findById(loggedInUserId);
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    if (user.bookmarks.includes(tweetId)) {
      // Remove from bookmark
      await userModel.findByIdAndUpdate(loggedInUserId, {
        $pull: { bookmarks: tweetId },
      });
      return res.status(200).json({
        message: "Removed from bookmark successfully!",
      });
    } else {
      // add to bookmark
      await userModel.findByIdAndUpdate(loggedInUserId, {
        $push: { bookmarks: tweetId },
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

//************* GET PROFILE DETAILS ***********/
export const getProfileDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//************* GET OTHER USERS ***********/
export const getOtherUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const otherUsers = await userModel
      .find({ _id: { $ne: id } })
      .select("-password");
    if (!otherUsers || otherUsers.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Not find any user!",
      });
    }

    //success
    return res.status(200).json({
      success: true,
      totalUsers: otherUsers.length,
      otherUsers,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//************* FOLLOW USER ***********/
export const followUser = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const userToFollowId = req.params.id;

    //Check the user to follow is exist or not
    const userToFollow = await userModel.findById(userToFollowId);
    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: "User not exists!",
      });
    }

    //Check the user is already followed or not
    const alreadyFollowing = userToFollow.followers.includes(loggedInUserId);
    if (alreadyFollowing) {
      return res.status(400).json({
        success: false,
        message: `You are already following ${userToFollow.name}!`,
      });
    }

    //Add the loggedIn user's Id in the follower' list of follow user (followers)
    await userModel.findByIdAndUpdate(userToFollowId, {
      $push: { followers: loggedInUserId },
    });

    //Add the followed user id in the following list of loggedIn user (following)
    await userModel.findByIdAndUpdate(loggedInUserId, {
      $push: { following: userToFollowId },
    });

    //Success Response
    return res.status(200).json({
      success: true,
      message: `You are now following to ${userToFollow.name}`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//************* UN-FOLLOW USER ***********/
export const unFollow = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const userToUnFollowId = req.params.id;

    //Check the user to un-follow is exist or not
    const userToUnFollow = await userModel.findById(userToUnFollowId);
    if (!userToUnFollow) {
      return res.status(404).json({
        success: false,
        message: "User not exists!",
      });
    }

    //Check if not user is already unfollowed
    const alreadyUnFollowed =
      !userToUnFollow.followers.includes(loggedInUserId);
    if (alreadyUnFollowed) {
      return res.status(400).json({
        success: false,
        message: `You are not following ${userToUnFollow.name}!`,
      });
    }

    //Remove the user from the followers list (following user)
    await userModel.findByIdAndUpdate(userToUnFollowId, {
      $pull: { followers: loggedInUserId },
    });

    //Remove the user from the following of logged in user (logged in user)
    await userModel.findByIdAndUpdate(loggedInUserId, {
      $pull: { following: userToUnFollowId },
    });

    //Success
    return res.status(200).json({
      success: true,
      message: `You are unfollowed to ${userToUnFollow.name}!`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//****** GET ALL TWEETS (LOGGEDIN USER + FOLLOWING USER) *****/
export const getAllTweets = async (req, res) => {
  try {
    const id = req.params.id;
    const loggedInUser = await userModel.findById(id);
    const loggedInUserTweets = await tweetModel.find({ userId: id });

    //Find all tweets of loggedIn user following
    const followingUserTweets = await Promise.all(
      loggedInUser.following.map((otherUsersId) => {
        return tweetModel.find({ userId: otherUsersId });
      })
    );

    //Combine tweets
    const allTweets = loggedInUserTweets.concat(...followingUserTweets);

    //Success Res
    return res.status(200).json({
      success: true,
      tweets: allTweets,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//********* GET FOLLOWING USER TWEETS *******/
export const getFollowingTweets = async (req, res) => {
  try {
    const id = req.params.id;
    const loggedInUser = await userModel.findById(id);

    //Get following user tweets
    const followingUserTweets = await Promise.all(
      loggedInUser.following.map((otherUsersId) => {
        return tweetModel.find({ userId: otherUsersId });
      })
    );

    //Success
    return res.status(200).json({
      success: true,
      tweets: [].concat(...followingUserTweets),
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
