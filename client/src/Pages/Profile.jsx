import React from "react";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";

const Profile = () => {
  return (
    <>
      <div className="flex justify-between w-[80%] mx-auto">
        <LeftSidebar />
        <div className="w-[50%] border-l border-r border-gray-200">
          <div>
            <div className="flex items-center px-4 py-2">
              <Link
                to={"/"}
                className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
              >
                <IoMdArrowBack size={"24px"} />
              </Link>
              <div className="ml-2">
                <h1 className="font-bold text-lg">Haris Mohanty</h1>
                <p className="text-gray-500 text-sm">10 posts</p>
              </div>
            </div>
            <img
              src={
                "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
              }
              alt="banner"
            />
            <div className="absolute top-56 ml-4 border-4 border-white rounded-full">
              <Avatar
                src="https://pbs.twimg.com/profile_images/1676844366659457024/1qiyi4zB_400x400.jpg"
                size="120"
                round={true}
              />
            </div>
            <div className="text-right m-3">
              <button className="px-4 py-1 rounded-full border border-gray-400 hover:bg-gray-200">
                Edit Profile
              </button>
            </div>
            <div className="m-3">
              <h1 className="font-bold text-xl">Haris Mohanty</h1>
              <p>@haris_mohanty</p>
            </div>
            <div className="m-3 text-sm">
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet
                cumque harum, facere quo tenetur dolores ab neque error
                perferendis, iure
                inventore reprehenderit laudantium natus voluptas eveniet.
              </p>
            </div>
          </div>
        </div>
        <RightSidebar />
      </div>
    </>
  );
};

export default Profile;
