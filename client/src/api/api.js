import axios from "axios";

//**************** REGISTER USER **********/
export const registerUser = async (data) => {
  try {
    const response = await axios.post("/user/register", data);

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
    const response = await axios.post("/user/login", data);

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Unexcepted Error Occurred!");
    }
  } catch (err) {
    throw err;
  }
};
