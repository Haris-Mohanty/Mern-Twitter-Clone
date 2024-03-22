import React from "react";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";

const Profile = () => {
  return (
    <>
      <div className="flex justify-between w-[80%] mx-auto">
        <LeftSidebar />
        <div className="w-[50%]">
          <div>
            <img
              src={
                "https://pbs.twimg.com/profile_images/1676844366659457024/1qiyi4zB_400x400.jpg"
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
