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

//********** GET FOLLOWING USERS TWEETS **************/
export const getFollowingUsersTweets = async (id) => {
  try {
    const response = await axios.get(`/user/following-tweets/${id}`, {
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

//********** FOLLOW USER **************/
export const followUser = async (id, loggedInUserId) => {
  try {
    const response = await axios.post(
      `/user/follow/${id}`,
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

//********** UN-FOLLOW USER **************/
export const unFollowUser = async (id, loggedInUserId) => {
  try {
    const response = await axios.post(
      `/user/unfollow/${id}`,
      { id: loggedInUserId },
      { withCredentials: true }
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

//********** BOOKMARK TWEET **************/
export const bookmarkTweet = async (id, loggedInUserId) => {
  try {
    const response = await axios.put(
      `/tweet/bookmark/${id}`,
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

//********** LOGOUT **************/
export const logout = async () => {
  try {
    const response = await axios.get("/user/logout");
    return response.data;
  } catch (err) {
    throw err;
  }
};

//********** SEARCH USER BY NAME **************/
export const searchUserByName = async (query) => {
  try {
    const response = await axios.get(`/user/search-user?name=${query}`, {
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

//********** ADD USER BIO **************/
export const addUserBio = async (id, bio) => {
  try {
    const response = await axios.post(
      `/user/add-bio/${id}`,
      { bio },
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

//******* SHOW TOTAL POST OF USER ***********/
export const totalPostOfUser = async (id) => {
  try {
    const response = await axios.get(`/user/totalPost/${id}`, {
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

//******* SHOW BOOKMARKS OF USER ***********/
export const showBookmarksOfUser = async (id) => {
  try {
    const response = await axios.get(`/tweet/show-bookmarks-of-user/${id}`, {
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
