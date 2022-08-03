import React from "react";
import "./Character.css";
import ListButton from "../components/ListButton";
import UserPageCharacter from "../components/UserPageCharacter";

function Character() {
  return (
    <div>
      <ListButton></ListButton>
      <div className="gridWrap"></div>
      <UserPageCharacter />
    </div>
  );
}

export default Character;
