import React, { useState } from "react";
import ImageList from "../components/ImageList";

function ImageListBlock() {
  const [count, setCount] = useState(1);
  const [totalList, setTotalList]: [any, any] = useState({
    file: [
      {
        name: "you",
        pictures: [],
      },
    ],
  });
  const addImgList = () => {
    setTotalList({
      file: [
        ...totalList.file,
        { name: "other".concat(String(count)), pictures: [] },
      ],
    });
    setCount((count) => count + 1);
    console.log(totalList);
  };

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={() => addImgList()}
      ></button>
      <button
        className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={() => {
          console.log(totalList);
        }}
      ></button>

      <ImageList name="you"></ImageList>
      <ImageList name="other"></ImageList>
    </>
  );
}

export default ImageListBlock;
