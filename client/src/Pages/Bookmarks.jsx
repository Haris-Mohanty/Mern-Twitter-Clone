import React, { useEffect, useState } from "react";
import { showBookmarksOfUser } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const Bookmarks = () => {
  const { user, otherUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [bookmarks, setBookmarks] = useState([]);

  const fetchBookmarksOfUser = async () => {
    try {
      dispatch(showLoading());
      const res = await showBookmarksOfUser(user?._id);
      if (res.success) {
        dispatch(hideLoading());
        setBookmarks(res.bookmarks);
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBookmarksOfUser();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="flex justify-between w-[80%] mx-auto">
        <LeftSidebar />
        <div className="w-[50%] border-l border-r border-gray-200">
          <div className="flex items-center px-4 py-2">
            <Link
              to={"/"}
              className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
            >
              <IoMdArrowBack size={"24px"} />
            </Link>
            <div className="ml-2">
              <h1 className="text-2xl font-bold">Bookmarks</h1>
              <p className="text-gray-500 text-sm">@{user?.username}</p>
            </div>
          </div>
          <div>
            <div>
              {bookmarks.map((bookmark) => (
                <div
                  key={bookmark._id}
                  className="bg-white p-4 rounded-lg shadow-md mb-4"
                >
                  <p className="text-gray-800">{bookmark.description}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Bookmarked At: {bookmark.createdAt}
                  </p>
                </div>
              ))}
              {bookmarks.length === 0 && (
                <div className="text-center mt-5">
                  <h1 className="text-3xl font-bold px-5">
                    Save posts for later
                  </h1>
                  <p className="text-gray-600">
                    Bookmark posts to easily find them again in the future.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <RightSidebar otherUser={otherUsers} />
      </div>
    </>
  );
};

export default Bookmarks;
