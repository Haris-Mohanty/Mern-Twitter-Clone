import React from "react";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";

const Notification = () => {
  return (
    <>
      <div className="flex justify-between w-[80%] mx-auto">
        <LeftSidebar />
        <div>Notification</div>
        <RightSidebar />
      </div>
    </>
  );
};

export default Notification;
