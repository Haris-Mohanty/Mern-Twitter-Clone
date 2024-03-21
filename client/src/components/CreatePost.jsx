import React from "react";
import Avatar from "react-avatar";

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
            <div className="mt-3">
              <div>
                <Avatar
                  src="https://pbs.twimg.com/profile_images/1676844366659457024/1qiyi4zB_400x400.jpg"
                  size="40"
                  round={true}
                />
              </div>
              <input type="text" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
