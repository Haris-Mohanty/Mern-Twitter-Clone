import React from "react";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <>
      <div className="flex justify-between w-[80%] mx-auto">
        <LeftSidebar />
        <div className="w-[50%] border">
          <div>
            <div className="flex items-center px-4 py-2">
              <Link to={"/"} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
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
          </div>
        </div>
        <RightSidebar />
      </div>
    </>
  );
};

export default Profile;
