import React from "react";
import { whiteFaceImageDto } from "../../utils/types";
/**
 * @name : Teawon
 * @component :ImgBlock - 특정 하나의 이미지와 삭제버튼 (X) 을 묶어주는 컴포넌트
 * @create-data: 2022-07-15
 */

interface ImageButtonProps {
  deleteFileImage: (string) => void;
  whiteFaceImageDto: whiteFaceImageDto;
}

function ImgBlock({ deleteFileImage, whiteFaceImageDto }: ImageButtonProps) {
  return (
    <div className="relative pb-full max-w-fit">
      <img
        className="flex object-cover object-center aspect-square"
        alt="sample"
        src={whiteFaceImageDto.url}
      />
      <button
        onClick={() => deleteFileImage(whiteFaceImageDto.id)}
        className="deleteBtn absolute w-5 h-5 right-0 top-0 mt-1 mr-1"
      >
        <img className="del" alt="deleteBtn" src="/images/negative.png" />
      </button>
    </div>
  );
}

export default ImgBlock;
