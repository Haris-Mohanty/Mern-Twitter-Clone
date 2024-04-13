import React from "react";
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";

const Tweet = ({ tweet }) => {
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
                  <div className="p-2 rounded-full hover:bg-pink-100 cursor-pointer">
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
