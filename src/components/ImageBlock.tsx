import React, { useState } from "react";
import { HiOutlineX } from "react-icons/hi";
/**
 * @name : Teawon
 * @component :ImgBlock - 특정 하나의 이미지와 삭제버튼 (X) 을 묶어주는 컴포넌트
 * @create-data: 2022-07-15
 */

interface ImageButtonProps {
  deleteFileImage: any;
  object: any;
}

function ImgBlock({ deleteFileImage, object }: ImageButtonProps) {
  return (
    <div className="col-span-1 relative justify-center">
      <button
        onClick={() => deleteFileImage(object.id)}
        className="absolute z-1 place-items-start w-36"
      >
        <HiOutlineX size="30" color="red" />
      </button>
      <img className="h-36 w-36 z-10" alt="sample" src={object.url} />

      {/* <img
          className="flex w-14 h-8 z-1 "
          alt="deleteBtn"
          src="images/deleteButton.png"
        /> */}
    </div>
  );
}

export default ImgBlock;
