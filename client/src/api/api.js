import axios from "axios";

//**************** REGISTER USER **********/
export const registerUser = async (data) => {
  try {
    const response = await axios.post("/user/register", data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};

//**************** REGISTER USER **********/
export const loginUser = async (data) => {
  try {
    const response = await axios.post("/user/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};

//**************** GET USER PROFILE **********/
export const getUserProfile = async (id) => {
  try {
    const response = await axios.get(`/user/get-profile/${id}`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};

//**************** GET OTHER USERS **********/
export const getOtherUsers = async (id) => {
  try {
    const response = await axios.get(`/user/other-users/${id}`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};

//**************** GET ALL TWEETS **********/
export const getAllTweets = async (id) => {
  try {
    const response = await axios.get(`/user/get-tweets/${id}`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};

//**************** CREATE POST || TWEET **********/
export const createPost = async (data) => {
  try {
    const response = await axios.post("/tweet/create-tweet", data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};

//*************** LIEK AND DISLIKE TWEET **************/
export const likeAndDislike = async (tweetId, loggedInUserId) => {
  try {
    const response = await axios.put(
      `/tweet/like/${tweetId}`,
      { id: loggedInUserId },
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};

//*************** DELETE TWEET **************/
export const deleteTweet = async (id) => {
  try {
    const response = await axios.delete(`/tweet/delete-tweet/${id}`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};
