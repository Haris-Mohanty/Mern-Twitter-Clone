import React from "react";
import logo from "../Assets/twitter.png";
import { GoHome } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { IoBookmarksOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const LeftSidebar = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <div className="w-[25%]">
        <div>
          <img
            width={"24px"}
            className="ml-4 mt-4"
            src={logo}
            alt="twitter-logo"
          />
        </div>
        <div className="my-4">
          <Link
            to={"/"}
            className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer"
          >
            <GoHome size={"24px"} />
            <h1 className="font-semibold text-lg ml-2">Home</h1>
          </Link>
          <Link
            to={"/explore"}
            className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer"
          >
            <CiSearch size={"24px"} />
            <h1 className="font-semibold text-lg ml-2">Explore</h1>
          </Link>
          <Link
            to={"/notifications"}
            className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer"
          >
            <IoNotificationsOutline size={"24px"} />
            <h1 className="font-semibold text-lg ml-2">Notifications</h1>
          </Link>
          <Link
            to={`/profile/${user?._id}`}
            className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer"
          >
            <CiUser size={"24px"} />
            <h1 className="font-semibold text-lg ml-2">Profile</h1>
          </Link>
          <Link
            to={"/bookmarks"}
            className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer"
          >
            <IoBookmarksOutline size={"24px"} />
            <h1 className="font-semibold text-lg ml-2">Bookmarks</h1>
          </Link>
          <Link
            to={"/logout"}
            className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer"
          >
            <CiLogout size={"24px"} />
            <h1 className="font-semibold text-lg ml-2">Logout</h1>
          </Link>
          <button className="px-4 py-2 border-none text-md bg-[#109BF0] w-[70%] rounded-full text-white font-bold">
            Post
          </button>
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;
