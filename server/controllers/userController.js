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
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Ensure secure flag is set in production
        sameSite: "None", // Required for cross-site cookie
      })
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

    // Logged in user Deatils
    const loggedInUser = await userModel.findById(loggedInUserId);

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

    //Push Notification to user
    const unSeenNotifications = userToFollow.unSeenNotifications;
    unSeenNotifications.push({
      type: "user-follow-request",
      data: { loggedInUser },
      message: `${loggedInUser.name} started following you`,
      onClickPath: "/profile",
    });
    await userModel.findByIdAndUpdate(userToFollowId, { unSeenNotifications });

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

    // Find the details of logged in user
    const loggedInUser = await userModel.findById(loggedInUserId);

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

    // Push notifications to user
    const unSeenNotifications = userToUnFollow.unSeenNotifications;
    unSeenNotifications.push({
      type: "user-unfollow-request",
      data: { loggedInUser },
      message: `${loggedInUser.name} unfollowed you`,
      onClickPath: "/profile",
    });
    await userModel.findByIdAndUpdate(userToUnFollowId, {
      unSeenNotifications,
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
    const loggedInUserTweets = await tweetModel
      .find({ userId: id })
      .populate({ path: "userId", select: "-password" });

    //Find all tweets of loggedIn user following
    const followingUserTweets = await Promise.all(
      loggedInUser.following.map((otherUsersId) => {
        return tweetModel
          .find({ userId: otherUsersId })
          .populate({ path: "userId", select: "-password" });
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

//********* GET FOLLOWING USER TWEETS ***********/
export const getFollowingTweets = async (req, res) => {
  try {
    const id = req.params.id;
    const loggedInUser = await userModel.findById(id);

    //Get following user tweets
    const followingUserTweets = await Promise.all(
      loggedInUser.following.map((otherUsersId) => {
        return tweetModel.find({ userId: otherUsersId }).populate("userId");
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

//********* SEARCH USER BY NAME ***********/
export const searchUserByName = async (req, res) => {
  try {
    const { name } = req.query;

    const regexPattern = new RegExp(`^${name}`, "i");

    const user = await userModel.find({
      name: { $regex: regexPattern },
    });

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

//************* ADD BIO ***********/
export const addBio = async (req, res) => {
  try {
    const userId = req.params.id;
    const { bio } = req.body;

    if (!bio) {
      return res.status(422).json({
        success: false,
        message: "Please add bio!",
      });
    }

    // Find user
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found!",
      });
    }

    //Update user bio
    user.bio = bio;
    await user.save();

    //Success res
    return res.status(200).json({
      success: true,
      message: "Bio Added Successfully!",
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

//*************** TOTAL POST OF USER *************/
export const totalPostOfUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found!",
      });
    }

    const tweets = await tweetModel.find({ userId: id });

    //Success Res
    return res.status(200).json({
      success: true,
      tweets,
      totalTweets: tweets.length,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//************ UPDATE USER PROFILE DETAILS **********/
export const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, bio } = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { name, bio },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //Success
    return res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//************ MARK ALL NOTIFICATIONS AS SEEN ******************/
export const markAllNotificationsAsSeen = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found!",
      });
    }

    //Get un seen notifications
    const unSeenNotifications = user.unSeenNotifications;
    if (unSeenNotifications.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No notifications to mark as seen!",
      });
    }

    //Appen un seen notifications array to seen notifications array
    user.seenNotifications.push(...unSeenNotifications);

    // Clear un seen notifications array
    user.unSeenNotifications = [];

    //Save the updated user
    const updatedUser = await user.save();

    //Password hide
    updatedUser.password = undefined;

    //Success res
    return res.status(200).json({
      success: true,
      message: "All notifications marked as seen!",
      updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//************ DELETE ALL SEEN NOTIFICATIONS ***************/
export const deleteAllSeenNotifications = async (req, res) => {
  try {
    const { id } = req.body;

    // Get user by userId
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found!",
      });
    }

    // When seen notifications is not available
    if (user.seenNotifications.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No seen notifications to delete!",
      });
    }

    // Clear the seenNotifications array
    user.seenNotifications = [];

    //Update user
    const updatedUser = await user.save();

    //Password hide
    updatedUser.password = undefined;

    // Success res
    return res.status(200).json({
      success: true,
      message: "Delete all seen notifications successfully!",
      updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
