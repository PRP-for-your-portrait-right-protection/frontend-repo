import React, { useState } from "react";
/**
 * @name : Teawon
 * @component :CharacterBlock - 특정 하나의 캐릭터 이미지와 삭제버튼 (X) 을 묶어주는 컴포넌트
 * @create-data: 2022-07-20
 */

interface CharacterButtonProps {
  deleteFileCharacter: any;
  object: any;
}

function CharacterBlock({ deleteFileCharacter, object }: CharacterButtonProps) {
  return (
    <div className="col-span-1 flex justify-center">
      <img className="absolute h-36 w-36 z-2" alt="sample" src={object.url} />
      <button onClick={() => deleteFileCharacter(object.id)}>
        <img
          className="relative w-8 h-8 z-1 -top-14 -left-14"
          alt="deleteBtn"
          src="images/deleteButton.png"
        />
      </button>
    </div>
  );
}

export default CharacterBlock;
