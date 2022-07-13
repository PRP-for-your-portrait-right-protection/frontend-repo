import React, { useState } from "react";

interface ImageButtonProps {
  deleteFileImage: any;
  object: any;
}

function ImgBlock({ deleteFileImage, object }: ImageButtonProps) {
  return (
    <div className="col-span-1">
      <img className="h-60 w-60" alt="sample" src={object.url} />
      <button
        style={{
          width: "50px",
          height: "30px",
          cursor: "pointer",
        }}
        onClick={() => deleteFileImage(object.id)}
      >
        삭제
      </button>
    </div>
  );
}

export default ImgBlock;
