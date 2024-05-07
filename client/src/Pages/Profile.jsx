import React, { useEffect, useState } from "react";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import Avatar from "react-avatar";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/spinnerSlice";
import {
  addUserBio,
  followUser,
  getUserProfile,
  unFollowUser,
} from "../api/api";
import { followingUpdate, setProfile } from "../redux/userSlice";
import { setRefresh } from "../redux/tweetSlice";
import toast from "react-hot-toast";
import { FiUsers, FiUserPlus } from "react-icons/fi";

const Profile = () => {
  const { user, profile, otherUsers } = useSelector((state) => state.user);
  const [users, setUsers] = useState(null);
  const [bio, setBio] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();

  //Gte User Profile Details
  const getUserProfileDetails = async () => {
    try {
      dispatch(showLoading());
      const res = await getUserProfile(id);
      if (res.success) {
        dispatch(hideLoading());
        dispatch(setProfile(res.user));
        setUsers(res.user);
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
    }
  };

  // FOLLOW AND UNFOLLOW HANDLER
  const followAndUnfollowHandler = async () => {
    if (user?.following.includes(id)) {
      //Unfollow user
      try {
        dispatch(showLoading());
        const res = await unFollowUser(id, user?._id);
        if (res.success) {
          dispatch(followingUpdate(id));
          dispatch(hideLoading());
          toast.success(res.message);
        }
      } catch (err) {
        dispatch(hideLoading());
        console.log(err);
        toast.error(err.response.data.message);
      }
    } else {
      //Follow user
      try {
        dispatch(showLoading());
        const res = await followUser(id, user?._id);
        if (res.success) {
          dispatch(hideLoading());
          dispatch(followingUpdate(id));
          toast.success(res.message);
          dispatch(setRefresh());
        }
      } catch (err) {
        dispatch(hideLoading());
        toast.error(err.response.data.message);
      }
    }
  };

  //************ ADD USER BIO *******/
  const addBioHandler = async () => {
    try {
      dispatch(showLoading());
      const res = await addUserBio(id, bio);

      if (res.success) {
        dispatch(setProfile(res.user));
        dispatch(hideLoading());
        toast.success(res.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    getUserProfileDetails();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="flex justify-between w-[80%] mx-auto">
        <LeftSidebar />
        <div className="w-[50%] border-l border-r border-gray-200">
          <div className="h-[100%] w-[100%]">
            <div className="flex items-center px-4 py-2">
              <Link
                to={"/"}
                className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
              >
                <IoMdArrowBack size={"24px"} />
              </Link>
              <div className="ml-2">
                <h1 className="font-bold text-lg">{users?.name}</h1>
                <p className="text-gray-500 text-sm">10 posts</p>
              </div>
            </div>
            <img
              src={
                "https://png.pngtree.com/thumb_back/fh260/background/20230707/pngtree-bare-wooden-table-surrounded-by-blurred-winter-wonderland-perfect-for-3d-image_3791056.jpg"
              }
              className="h-[34%] w-[100%]"
              alt="banner"
            />
            <div className="absolute top-56 ml-4 border-4 border-white rounded-full">
              <Avatar
                src="https://static.dezeen.com/uploads/2023/07/x-logo-twitter-elon-musk_dezeen_2364_col_0.jpg"
                size="120"
                round={true}
              />
            </div>
            <div className="text-right m-3">
              {user?._id === profile?._id ? (
                <button className="px-4 py-1 rounded-full border border-gray-400 hover:bg-gray-200">
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={followAndUnfollowHandler}
                  className="px-4 py-1 bg-black text-white rounded-full"
                >
                  {user?.following.includes(id) ? "Following" : "Follow"}
                </button>
              )}
            </div>
            <div className="m-3">
              <h1 className="font-bold text-xl mt-5">{users?.name}</h1>
              <p>@{users?.username}</p>
            </div>

            {/******* FOLLOWER AND FOLLOWING ******/}
            <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
              {/* Followers */}
              <div className="flex items-center">
                <FiUsers className="text-blue-500 text-2xl mr-2" />
                <div>
                  <h3 className="font-bold">Followers</h3>
                  <p className="text-gray-600">
                    {profile?.followers.length} Followers
                  </p>
                </div>
              </div>

              {/* Following */}
              <div className="flex items-center">
                <FiUserPlus className="text-blue-500 text-2xl mr-2" />
                <div>
                  <h3 className="font-bold">Following</h3>
                  <p className="text-gray-600">
                    {profile?.following.length} Following
                  </p>
                </div>
              </div>
            </div>

            {/******  ADD BIO *********/}
            {profile && (
              <div className="m-3 text-sm">
                {user?._id === profile._id ? (
                  profile?.bio ? (
                    <p>{profile?.bio}</p>
                  ) : (
                    <div className="mt-5">
                      <input
                        type="text"
                        placeholder="Write your bio"
                        className="mr-2 px-2 py-1 border border-gray-300 rounded-lg w-[86%]"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                      />
                      <button
                        onClick={addBioHandler}
                        className="px-4 py-1 bg-black text-white rounded-lg"
                      >
                        Save
                      </button>
                    </div>
                  )
                ) : (
                  <div className="mt-5">
                    <p>{profile?.bio ? profile.bio : "No Bio"}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <RightSidebar otherUser={otherUsers} />
      </div>
    </>
  );
};

export default Profile;
