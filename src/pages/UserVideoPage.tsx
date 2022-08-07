import React from "react";
import "./UserVideoPage.css";
import ListButton from "../components/UserNavbar";
import LandingPage from "../components/video/UserPageVideo";

function Video() {
  return (
    <ul>
      <ListButton></ListButton>
      <div className="gridWrap"></div>
      <LandingPage />
    </ul>
  );
}

export default Video;
