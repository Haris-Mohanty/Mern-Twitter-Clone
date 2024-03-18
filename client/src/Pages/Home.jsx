import React from "react";
import LeftSidebar from "../components/LeftSidebar";
import Feed from "../components/Feed";
import RightSidebar from "../components/RightSidebar";

const Home = () => {
  return (
    <div>
      <LeftSidebar />
      <Feed />
      <RightSidebar />
    </div>
  );
};

export default Home;
