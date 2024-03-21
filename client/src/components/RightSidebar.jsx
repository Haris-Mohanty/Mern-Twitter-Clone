import React from "react";
import Avatar from "react-avatar";
import { CiSearch } from "react-icons/ci";

const RightSidebar = () => {
  return (
    <>
      <div className="w-[25%] mt-2 ml-4">
        <div className="flex items-center p-2 bg-gray-100 rounded-full outline-none w-full">
          <CiSearch size={20} />
          <input
            type="text"
            className="bg-transparent outline-none px-2"
            placeholder="Search"
          />
        </div>
        <div className="p-4 my-4 bg-gray-100 rounded-2xl">
          <h1 className="font-bold text-lg">Who to follow</h1>
          <div className="flex ic justify-between my-3">
            <div className="flex">
              <div>
                <Avatar
                  src="https://pbs.twimg.com/profile_images/1676844366659457024/1qiyi4zB_400x400.jpg"
                  size="40"
                  round={true}
                />
              </div>
              <div className="ml-2 ">
                <h1 className="font-bold">Virat</h1>
                <p className="text-sm text-gray-600">@virat_kohli637</p>
              </div>
            </div>
            <div>
              <button className="px-4 py-1 bg-black text-white rounded-full">
                Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSidebar;
