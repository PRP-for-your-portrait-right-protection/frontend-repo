import React, { useState } from "react";

interface ImageButtonProps {
  deleteFileImage: any;
  object: any;
}

function ImgBlock({ deleteFileImage, object }: ImageButtonProps) {
  return (
    <div className="col-span-1 ">
      <img className="h-60 w-60" alt="sample" src={object.url} />
      <button onClick={() => deleteFileImage(object.id)}>
        <img
          className="absolute  h-5 w-5"
          alt="deleteBtn"
          src="images/deleteButton.png"
        />
      </button>
    </div>
  );
}

export default ImgBlock;
