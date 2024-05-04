import React from "react";
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { bookmarkTweet, deleteTweet, likeAndDislike } from "../api/api";
import toast from "react-hot-toast";
import { setRefresh } from "../redux/tweetSlice";

const Tweet = ({ tweet }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Like and Dislike
  const likeDislikeHandler = async (tweetId) => {
    try {
      dispatch(showLoading());
      const res = await likeAndDislike(tweetId, user?._id);
      dispatch(hideLoading());
      dispatch(setRefresh());
      toast.success(res.message);
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.response.data.message);
    }
  };

  //Delete Tweet
  const deleteTweetHandler = async (id) => {
    try {
      dispatch(showLoading());
      const res = await deleteTweet(id);
      if (res.success) {
        dispatch(hideLoading());
        toast.success(res.message);
        dispatch(setRefresh());
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.response.data.message);
    }
  };

  // Bookmark Tweet
  const bookmarkTweetHandler = async (id) => {
    try {
      dispatch(showLoading());
      const res = await bookmarkTweet(id, user?._id);
      dispatch(hideLoading());
      dispatch(setRefresh());
      toast.success(res.message);
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.response.data.message);
    }
  };

  const userLikedTweet = tweet.like.some((like) => like === user?._id);
  return (
    <>
      <div className="border-b border-gray-200">
        <div>
          <div className="flex p-4">
            <Avatar
              src="https://static.dezeen.com/uploads/2023/07/x-logo-twitter-elon-musk_dezeen_2364_col_0.jpg"
              size="40"
              round={true}
            />
            <div className="ml-2 w-full">
              <div className="flex items-center">
                <h1 className="font-bold">{tweet?.userId?.name} </h1>
                <p className="text-gray-500 text-sm">
                  @{tweet?.userId?.username} .1m
                </p>
              </div>
              <div>
                <p>{tweet?.description}</p>
              </div>
              <div className="flex justify-between my-3">
                <div className="flex items-center">
                  <div className="p-2 rounded-full hover:bg-blue-100 cursor-pointer">
                    <FaRegComment />
                  </div>
                  <p>0</p>
                </div>
                <div className="flex items-center ">
                  <div
                    onClick={() => likeDislikeHandler(tweet?._id)}
                    className={`p-2 rounded-full cursor-pointer hover:scale-110 transition duration-300 ease-in-out ${
                      userLikedTweet ? "p-0 mx-1" : "hover:bg-pink-200"
                    }`}
                  >
                    {userLikedTweet ? (
                      <FaHeart color="red" />
                    ) : (
                      <FaRegHeart color="inherit" />
                    )}
                  </div>
                  <p>{tweet?.like?.length}</p>
                </div>
                <div className="flex items-center ">
                  <div
                    onClick={() => bookmarkTweetHandler(tweet?._id)}
                    className="p-2 rounded-full hover:bg-blue-100 cursor-pointer"
                  >
                    <FaRegBookmark />
                  </div>
                  <p>{user?.bookmarks?.length}</p>
                </div>
                {user?._id === tweet?.userId?._id && (
                  <div className="flex items-center ">
                    <div
                      onClick={() => deleteTweetHandler(tweet?._id)}
                      className="p-2 rounded-full hover:bg-red-400 cursor-pointer"
                    >
                      <MdDeleteOutline />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tweet;
