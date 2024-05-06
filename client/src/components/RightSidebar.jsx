import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { searchUserByName } from "../api/api";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";

const RightSidebar = ({ otherUser }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();

  // Showing Users upto 3
  const showOtherUsers = otherUser ? otherUser.slice(0, 3) : [];

  // Fetch users
  const fetchUsers = async () => {
    try {
      let results = [];
      if (searchQuery) {
        dispatch(showLoading());
        const response = await searchUserByName(searchQuery);
        dispatch(hideLoading());
        results = response.user;
      } else {
        results = showOtherUsers;
      }

      setSearchResults(results);
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    //eslint-disable-next-line
  }, [searchQuery]);

  return (
    <>
      <div className="w-[25%] mt-2 ml-4">
        <div className="flex items-center p-2 bg-gray-100 rounded-full outline-none w-full">
          <CiSearch size={20} />
          <input
            type="text"
            className="bg-transparent outline-none px-2"
            placeholder="Search User"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="p-4 my-4 bg-gray-100 rounded-2xl">
          <h1 className="font-bold text-lg">Who to follow</h1>
          {searchResults?.map((user) => (
            <div key={user?._id} className="flex ic justify-between my-3">
              <div className="flex">
                <div>
                  <Avatar
                    src="https://static.dezeen.com/uploads/2023/07/x-logo-twitter-elon-musk_dezeen_2364_col_0.jpg"
                    size="40"
                    round={true}
                  />
                </div>
                <div className="ml-2 ">
                  <h1 className="font-bold">{user?.name}</h1>
                  <p className="text-sm text-gray-600">@{user?.username}</p>
                </div>
              </div>
              <div>
                <Link to={`/profile/${user?._id}`}>
                  <button className="px-4 py-1 bg-black text-white rounded-full">
                    Profile
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RightSidebar;
