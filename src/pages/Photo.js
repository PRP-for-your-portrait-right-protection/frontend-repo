import React from "react";
import "./Photo.css";
import BasicButton from "../components/BasicButton2";
import ListButton from "../components/ListButton";
function Photo() {
  return (
    <div>
      <BasicButton></BasicButton>
      <ListButton></ListButton>
      <div className="font2">PHOTO</div>
    </div>
  );
}

export default Photo;
