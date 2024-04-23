import React, { useState } from "react";
import Avatar from "react-avatar";
import { CiImageOn } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { createPost, getAllTweets, getFollowingUsersTweets } from "../api/api";
import { setRefresh, setAllTweets, setIsActive } from "../redux/tweetSlice";
import toast from "react-hot-toast";

const CreatePost = () => {
  const { user } = useSelector((state) => state.user);
  const { isActive } = useSelector((state) => state.tweets);

  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  // Submit || Post Tweet
  const submitHandler = async () => {
    try {
      const id = user._id;
      const data = { description, id };
      dispatch(showLoading());
      const res = await createPost(data);
      dispatch(setRefresh());
      if (res.success) {
        dispatch(hideLoading());
        setDescription("");
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
    }
  };

  //Show Following Tweets
  const followingTweetHandler = async () => {
    try {
      dispatch(showLoading());
      const res = await getFollowingUsersTweets(user?._id);
      dispatch(setAllTweets(res.tweets));
      dispatch(setIsActive(false));
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.response.data.message);
    }
  };

  const forYouHandler = async () => {
    try {
      dispatch(showLoading());
      const res = await getAllTweets(user?._id);
      dispatch(setAllTweets(res.tweets));
      dispatch(setIsActive(true));
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <div className="w-[100%]">
        <div>
          <div className="flex items-center justify-around border-b border-gray-200">
            <div
              onClick={forYouHandler}
              className={`${
                isActive
                  ? "border-b-4 border-blue-600"
                  : "border-b border-transparent"
              } cursor-pointer hover:bg-gray-200 text-center w-full px-4 py-3`}
            >
              <h1 className="font-semibold text-gray-600">For you</h1>
            </div>
            <div
              onClick={followingTweetHandler}
              className={`${
                !isActive
                  ? "border-b-4 border-blue-600"
                  : "border-b border-transparent"
              } cursor-pointer hover:bg-gray-200 text-center w-full px-4 py-3`}
            >
              <h1 className="font-semibold text-gray-600">Following</h1>
            </div>
          </div>
          <div>
            <div className="">
              <div className="flex items-center p-4">
                <div>
                  <Avatar
                    src="https://pbs.twimg.com/profile_images/1676844366659457024/1qiyi4zB_400x400.jpg"
                    size="40"
                    round={true}
                  />
                </div>
                <input
                  className="w-full outline-none border-none text-lg ml-2 font-semibold"
                  type="text"
                  placeholder="What is happening?!"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between p-4 border-b border-gray-300">
                <div>
                  <CiImageOn size={20} color="#0062ff" />
                </div>
                <button
                  onClick={submitHandler}
                  className="bg-[#109BF0] text-white rounded-full px-4 py-1 text-lg font-semibold border-none"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
