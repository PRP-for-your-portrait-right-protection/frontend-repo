import React, { useState } from "react";
/**
 * @name : Teawon
 * @component :ImgBlock - 특정 하나의 이미지와 삭제버튼 (X) 을 묶어주는 컴포넌트
 * @create-data: 2022-07-15
 */

interface ImageButtonProps {
  deleteFileImage: any;
  object: any;
}

function CharacterBlock({ deleteFileImage, object }: ImageButtonProps) {
  return (
    <div className="col-span-1 ">
      <img className="h-60 w-60" alt="sample" src={object} />
    </div>
  );
}

export default CharacterBlock;
