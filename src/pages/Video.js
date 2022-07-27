import React from "react";
import "./Video.css";
import ListButton from "../components/ListButton";
import LandingPage from "components/LandingPage";

function Video() {
  return (
    <ul>
      <ListButton></ListButton>
      <div className="gridWrap">
        <div className="font1">VIDEO</div>
      </div>
      <LandingPage />
    </ul>
  );
}

export default Video;
