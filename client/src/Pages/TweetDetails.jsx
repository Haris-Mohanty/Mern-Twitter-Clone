import React, { useEffect, useState } from "react";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { getTweetDetails } from "../api/api";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import Avatar from "react-avatar";
import moment from "moment";
import CommentLikeBookmark from "../components/CommentLikeBookmark";

const TweetDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [tweet, setTweet] = useState(null);

  // ******** FETCH TWEET DETAILS ******/
  const fetchTweetDetails = async () => {
    try {
      dispatch(showLoading());
      const res = await getTweetDetails(id);
      if (res.success) {
        dispatch(hideLoading());
        setTweet(res.tweet);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    fetchTweetDetails();
    //eslint-disable-next-line
  }, []);

  // Format date using moment.js
  const formattedDate = moment(tweet?.createdAt).fromNow();

  return (
    <>
      <div className="flex justify-between w-[80%] mx-auto">
        <LeftSidebar />
        <div className="w-[50%] border-l border-r border-gray-200">
          <div className="flex items-center px-4 py-2">
            <Link
              to={"/"}
              className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
            >
              <IoMdArrowBack size={"24px"} />
            </Link>
            <div className="ml-2">
              <h1 className="font-bold text-xl">Post</h1>
            </div>
          </div>

          <div>
            {tweet && (
              <div className="flex p-4">
                <Avatar
                  src="https://static.dezeen.com/uploads/2023/07/x-logo-twitter-elon-musk_dezeen_2364_col_0.jpg"
                  size="40"
                  round={true}
                />
                <div className="ml-2 w-full">
                  <div className="flex items-center">
                    <h1 className="font-bold pr-1">{tweet?.userId?.name}</h1>
                    <p className="text-gray-500 text-sm">
                      @{tweet?.userId?.username} · {formattedDate}
                    </p>
                  </div>
                  <div>
                    <p>{tweet?.description}</p>
                  </div>
                  <CommentLikeBookmark tweet={tweet} />
                </div>
              </div>
            )}
          </div>
        </div>
        <RightSidebar />
      </div>
    </>
  );
};

export default TweetDetails;
