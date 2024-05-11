import React, { useEffect } from "react";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { getUserProfile } from "../api/api";
import { setUser } from "../redux/userSlice";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";

const Notification = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const fetchUserProfileDetails = async () => {
    try {
      dispatch(showLoading());
      const res = await getUserProfile(user?._id);
      if (res.success) {
        dispatch(hideLoading());
        dispatch(setUser(res.user));
        console.log(res);
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserProfileDetails();
  }, []);

  return (
    <>
      <div className="flex justify-between w-[80%] mx-auto">
        <LeftSidebar />
        <div className="w-[50%] border-l border-r border-gray-200">
          <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Notifications</h1>
            {/* Notification items */}
            <div className="flex flex-col space-y-4">
              {/* Notification item */}
              {user?.unSeenNotifications.map((notifications) => (
                <div className="flex items-center space-x-2">
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
