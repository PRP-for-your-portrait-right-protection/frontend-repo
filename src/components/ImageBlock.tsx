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
    <div className="relative">
      <img
        className="flex object-cover w-36 h-36"
        alt="sample"
        src={object.url}
      />
      <button onClick={() => deleteFileImage(object.id)} className="deleteBtn">
        <img
          className="del absolute w-5 h-5 right-0 top-0 mt-1 mr-1"
          alt="deleteBtn"
          src="images\negative.png"
        />
      </button>
      {/* <img
          className="flex w-14 h-8 z-1 "
          alt="deleteBtn"
          src="images/deleteButton.png"
        /> */}
    </div>
  );
}

export default ImgBlock;
// col-span-1 relative justify-center
// h-36 w-36 z-10
// absolute z-1 origin-top-right
