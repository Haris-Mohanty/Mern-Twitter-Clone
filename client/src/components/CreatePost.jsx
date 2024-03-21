import React from "react";
import Avatar from "react-avatar";
import { CiImageOn } from "react-icons/ci";

const CreatePost = () => {
  return (
    <>
      <div className="w-[100%]">
        <div>
          <div className="flex items-center justify-around border-b border-gray-200">
            <div className="cursor-pointer hover:bg-gray-200 text-center w-full px-4 py-3">
              <h1 className="font-semibold text-gray-600">For you</h1>
            </div>
            <div className="cursor-pointer hover:bg-gray-200 text-center w-full px-4 py-3">
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
                />
              </div>
              <div className="flex items-center justify-between p-4 border-b border-gray-300">
                <div>
                  <CiImageOn size={20} color="#0062ff"/>
                </div>
                <button className="bg-[#109BF0] text-white rounded-full px-4 py-1 text-lg font-semibold border-none">
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
