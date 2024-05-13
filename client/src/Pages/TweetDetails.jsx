import React from "react";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";

const TweetDetails = () => {
    
  return (
    <>
      <div className="flex justify-between w-[80%] mx-auto">
        <LeftSidebar />
        <div>Tweet</div>
        <RightSidebar />
      </div>
    </>
  );
};

export default TweetDetails;
