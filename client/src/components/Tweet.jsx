import React from "react";
import Avatar from "react-avatar";
import moment from "moment";
import { Link } from "react-router-dom";
import CommentLikeBookmark from "./CommentLikeBookmark";

const Tweet = ({ tweet }) => {
  // Format date using moment.js
  const formattedDate = moment(tweet?.createdAt).fromNow();

  return (
    <>
      <div className="border-b border-gray-200">
        <div>
          <div className="flex p-4">
            <Link to={`/profile/${tweet?.userId._id}`}>
              <Avatar
                src="https://static.dezeen.com/uploads/2023/07/x-logo-twitter-elon-musk_dezeen_2364_col_0.jpg"
                size="40"
                round={true}
              />
            </Link>
            <div className="ml-2 w-full">
              <Link to={`/tweet/${tweet?._id}`} className="block">
                <div className="flex items-center">
                  <h1 className="font-bold pr-1">{tweet?.userId?.name}</h1>
                  <p className="text-gray-500 text-sm">
                    @{tweet?.userId?.username} · {formattedDate}
                  </p>
                </div>
                <div>
                  <p>{tweet?.description}</p>
                </div>
              </Link>
              <CommentLikeBookmark tweet={tweet} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tweet;
