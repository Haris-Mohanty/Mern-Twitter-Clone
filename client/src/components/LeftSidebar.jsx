import React, { useEffect } from "react";
import logo from "../Assets/twitter.png";
import { GoHome } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { IoBookmarksOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import toast from "react-hot-toast";
import { getUserProfile, logout } from "../api/api";
import { setOtherUsers, setProfile, setUser } from "../redux/userSlice";
import { setAllTweets } from "../redux/tweetSlice";

const LeftSidebar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  //Logout
  const logoutHandler = async () => {
    try {
      dispatch(showLoading());
      const res = await logout();
      if (res.success) {
        dispatch(hideLoading());
        dispatch(setUser(null));
        dispatch(setOtherUsers(null));
        dispatch(setProfile(null));
        dispatch(setAllTweets(null));
        toast.success(res.message);
        navigate("/login");
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.response.data.message);
    }
  };

  // *********** USER PROFILE DETAILS FETCH ********/
  const fetchUserProfileDetails = async () => {
    try {
      dispatch(showLoading());
      const res = await getUserProfile(user?._id);
      if (res.success) {
        dispatch(hideLoading());
        dispatch(setUser(res.user));
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    fetchUserProfileDetails();
    //eslint-disable-next-line
  }, []);

  // Showing Badge on notification icon
  const unseenNotificationsCount = user?.unSeenNotifications?.length || 0;

  // Get the active tab based on url pathname
  const getActiveTab = (pathname) => {
    if (pathname === "/") return "home";
    if (pathname === "/explore") return "explore";
    if (pathname === "/notifications") return "notifications";
    if (pathname === `/profile/${user?._id}`) return "profile";
    if (pathname === "/bookmarks") return "bookmarks";
    return "";
  };
  const activeTab = getActiveTab(location.pathname);

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
            className={`flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer ${
              activeTab === "home" ? "bg-gray-200" : ""
            }`}
          >
            <GoHome size={"24px"} />
            <h1 className="font-semibold text-lg ml-2">Home</h1>
          </Link>
          <Link
            to={"/explore"}
            className={`flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer ${
              activeTab === "explore" ? "bg-gray-200" : ""
            }`}
          >
            <CiSearch size={"24px"} />
            <h1 className="font-semibold text-lg ml-2">Explore</h1>
          </Link>
          <Link
            to={"/notifications"}
            className={`flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer ${
              activeTab === "notifications" ? "bg-gray-200" : ""
            }`}
          >
            <div className="relative">
              <IoNotificationsOutline size={"24px"} />
              {unseenNotificationsCount > 0 && (
                <span className="absolute -top-2 -right-1 bg-red-500 text-white rounded-full px-1 py-0 text-xs">
                  {unseenNotificationsCount}
                </span>
              )}
            </div>
            <h1 className="font-semibold text-lg ml-2">Notifications</h1>
          </Link>
          <Link
            to={`/profile/${user?._id}`}
            className={`flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer ${
              activeTab === "profile" ? "bg-gray-200" : ""
            }`}
          >
            <CiUser size={"24px"} />
            <h1 className="font-semibold text-lg ml-2">Profile</h1>
          </Link>
          <Link
            to={"/bookmarks"}
            className={`flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer ${
              activeTab === "bookmarks" ? "bg-gray-200" : ""
            }`}
          >
            <IoBookmarksOutline size={"24px"} />
            <h1 className="font-semibold text-lg ml-2">Bookmarks</h1>
          </Link>
          <div
            onClick={logoutHandler}
            className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer"
          >
            <CiLogout size={"24px"} />
            <h1 className="font-semibold text-lg ml-2">Logout</h1>
          </div>
          <button className="px-4 py-2 border-none text-md bg-[#109BF0] w-[70%] rounded-full text-white font-bold">
            Post
          </button>
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;
