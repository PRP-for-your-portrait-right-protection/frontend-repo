import React from "react";
import "./Character.css";
import ListButton from "../components/ListButton";
import UserPageCharacter from "components/UserPageCharacter";
import CharacterLandingPage from "components/CharacterLandingPage";

function Character() {
  return (
    <div>
      <ListButton></ListButton>
      <div className="gridWrap">
        <div className="font3">CHARACTER</div>
      </div>
      <CharacterListBlock></CharacterListBlock>
      <CharacterLandingPage />
    </div>
  );
}

export default Character;
