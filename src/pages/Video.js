import React from "react";
import "./Video.css";
import ListButton from "../components/ListButton";
import BasicButton2 from "../components/BasicButton2";
import ResearchListBlock from "components/ResearchListBlock";
function Video() {
  return (
    <div>
      <BasicButton2></BasicButton2>
      <ListButton></ListButton>
      <div className="font1">VIDEO</div>
      <ResearchListBlock></ResearchListBlock>
    </div>
  );
}

export default Video;
