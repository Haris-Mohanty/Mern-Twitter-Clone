import React from "react";
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { likeAndDislike } from "../api/api";
import toast from "react-hot-toast";

const Tweet = ({ tweet }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Like and Dislike
  const likeDislikeHandler = async (tweetId) => {
    try {
      dispatch(showLoading());
      const res = await likeAndDislike(tweetId, user?._id);
      dispatch(hideLoading());
      toast.success(res.message);
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.response.data.message);
    }
  };
  return (
    <>
      <div className="border-b border-gray-200">
        <div>
          <div className="flex p-4">
            <Avatar
              src="https://pbs.twimg.com/profile_images/1676844366659457024/1qiyi4zB_400x400.jpg"
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
                    className="p-2 rounded-full hover:bg-pink-100 cursor-pointer"
                  >
                    <FaRegHeart />
                  </div>
                  <p>{tweet?.like?.length}</p>
                </div>
                <div className="flex items-center ">
                  <div className="p-2 rounded-full hover:bg-blue-100 cursor-pointer">
                    <FaRegBookmark />
                  </div>
                  <p>0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tweet;
