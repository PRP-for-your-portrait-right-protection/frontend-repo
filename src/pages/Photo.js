import React from "react";
import "./Photo.css";
import BasicButton from "../components/BasicButton2";
import ListButton from "../components/ListButton";
import ResearchListBlock from "components/ResearchListBlock";

function Photo() {
  return (
    <div>
      <BasicButton></BasicButton>
      <ListButton></ListButton>
      <div className="font2">PHOTO</div>
      <ResearchListBlock></ResearchListBlock>
    </div>
  );
}

export default Photo;
