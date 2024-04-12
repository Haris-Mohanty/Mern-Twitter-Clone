import React, { useEffect, useState } from "react";
import LeftSidebar from "../components/LeftSidebar";
import Feed from "../components/Feed";
import RightSidebar from "../components/RightSidebar";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/spinnerSlice";
import { getAllTweets, getOtherUsers } from "../api/api";
import { setOtherUsers } from "../redux/userSlice";
import { setAllTweets } from "../redux/tweetSlice";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [otherUser, setOtherUser] = useState([]);

  //Get other users
  const fetchOtherUsers = async () => {
    try {
      const id = user?._id;
      dispatch(showLoading());
      const res = await getOtherUsers(id);
      if (res.success) {
        dispatch(hideLoading());
        dispatch(setOtherUsers(res.otherUsers));
        setOtherUser(res.otherUsers);
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
    }
  };

  // Get all tweets
  const fetchAllTweets = async () => {
    try {
      const id = user?._id;
      dispatch(showLoading());
      const res = await getAllTweets(id);
      if (res.success) {
        dispatch(hideLoading());
        dispatch(setAllTweets(res.tweets));
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOtherUsers();
    fetchAllTweets();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="flex justify-between w-[80%] mx-auto">
      <LeftSidebar />
      <Feed />
      <RightSidebar otherUser={otherUser} />
    </div>
  );
};

export default Home;
