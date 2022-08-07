import React from "react";
import "./CharacterPage.css";
import ListButton from "../components/UserNavbar";
import UserPageCharacter from "../components/character/UserPageCharacter";

function CharacterPage() {
  return (
    <div>
      <ListButton></ListButton>
      <div className="gridWrap"></div>
      <UserPageCharacter />
    </div>
  );
}

export default CharacterPage;
