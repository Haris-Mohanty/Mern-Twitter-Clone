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
