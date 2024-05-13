import React from "react";
import CreatePost from "./CreatePost";
import Tweet from "./Tweet";
import { useSelector } from "react-redux";

const Feed = () => {
  const { tweets } = useSelector((state) => state.tweets);
  return (
    <>
      <div className="w-[50%] border border-gray-200">
        <CreatePost />
        {tweets.length === 0 ? (
          <div className="text-center py-8">
            <h2 className="text-gray-500 text-lg font-semibold">
              No tweets found.
            </h2>
            <p className="text-gray-400">Start sharing your thoughts now!</p>
          </div>
        ) : (
          tweets?.map((tweet) => <Tweet key={tweet?._id} tweet={tweet} />)
        )}
      </div>
    </>
  );
};

export default Feed;
