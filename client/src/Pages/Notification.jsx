import React, { useEffect, useState } from "react";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { getUserProfile, markAllNotificationsAsSeen } from "../api/api";
import { setUser } from "../redux/userSlice";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Notification = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("unSeen");

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

  // ********* MARK ALL NOTIFICATIONS AS SEEN **********/
  const handleMarkAllNotificationsAsSeen = async () => {
    try {
      dispatch(showLoading());
      const res = await markAllNotificationsAsSeen(user?._id);
      if (res.success) {
        dispatch(hideLoading());
        dispatch(setUser(res.updatedUser));
        toast.success(res.message);
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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const filteredNotifications =
    activeTab === "unSeen"
      ? user?.unSeenNotifications
      : user?.seenNotifications;

  return (
    <>
      <div className="flex justify-between w-[80%] mx-auto">
        <LeftSidebar />
        <div className="w-[50%] border-l border-r border-gray-200">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Notifications</h1>

            {/***************  SEEN AND UNSEEN TAB  *********/}
            <div className="flex space-x-4">
              <button
                onClick={() => handleTabChange("unSeen")}
                className={`text-md font-semibold ${
                  activeTab === "unSeen"
                    ? "text-blue-500 border-b-4 border-blue-400"
                    : "text-gray-500"
                }`}
              >
                Unseen
              </button>
              <button
                onClick={() => handleTabChange("seen")}
                className={`text-md font-semibold ${
                  activeTab === "seen"
                    ? "text-blue-500 border-b-4 border-blue-400"
                    : "text-gray-500"
                }`}
              >
                Seen
              </button>
            </div>

            {/****  MARK ALL AS SEEN AND DELETE ALL SEEN NOTIFICATIONS  *****/}
            <div className="flex justify-end space-x-4 mb-3">
              {activeTab === "unSeen" && (
                <button
                  onClick={handleMarkAllNotificationsAsSeen}
                  className="text-sm text-blue-500 font-semibold"
                >
                  Mark all as seen
                </button>
              )}
              {activeTab === "seen" && (
                <button className="text-sm text-red-500 font-semibold">
                  Delete all seen notifications
                </button>
              )}
            </div>

            <div className="flex flex-col space-y-4">
              {/************ NOTIFICATIONS *****************/}
              {filteredNotifications
                ?.slice(0)
                .reverse() // Reverse the array for showing latest notifications first
                .map((notifications, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Avatar
                      src="https://static.dezeen.com/uploads/2023/07/x-logo-twitter-elon-musk_dezeen_2364_col_0.jpg"
                      size="45"
                      round={true}
                    />
                    <div>
                      <Link
                        to={`/profile/${notifications?.data?.loggedInUser?._id}`}
                        className="font-semibold"
                      >
                        @{notifications?.data?.loggedInUser?.username}
                      </Link>
                      <p className="text-gray-600">{notifications?.message}!</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <RightSidebar />
      </div>
    </>
  );
};

export default Notification;
