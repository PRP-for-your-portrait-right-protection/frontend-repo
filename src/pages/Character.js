import React from "react";
import "./Character.css";
import BasicButton from "../components/BasicButton2";
import ListButton from "../components/ListButton";
import CharacterResearch from "components/CharacterResearch";

function Character() {
  return (
    <div>
      <BasicButton></BasicButton>
      <ListButton></ListButton>
      <div className="font3">CHARACTER</div>
      <CharacterResearch></CharacterResearch>
    </div>
  );
}

export default Character;
