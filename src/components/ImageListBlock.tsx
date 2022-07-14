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

  const changeFuc = (object, name) => {
    let findIndex = totalList.file.findIndex((element) => element.name == name);
    console.log("복사전 현재 상태");
    console.log(totalList);
    console.log("들어갈 데이터!");
    console.log(object);
    console.log("들어갈 데이터가 속한 이름!");
    console.log(name);
    console.log("해당 속성의 인덱스!");
    console.log(findIndex);

    let copyArray = { ...totalList };
    console.log("복사한 내용!");
    console.log(copyArray);
    copyArray.file[findIndex].pictures = [
      ...copyArray.file[findIndex].pictures,
      object,
    ];
    console.log("복사 직전 바꾼 내용!");
    console.log(copyArray);

    setTotalList(copyArray);

    console.log("복사후 최종 변경내용");
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

      {totalList.file &&
        totalList.file.map((imgList) => (
          <ImageList
            key={imgList.name}
            object={imgList}
            changeFuc={changeFuc}
          />
        ))}
      {
        // <ImageList name="you"></ImageList>
        // <ImageList name="other"></ImageList> */
      }
    </>
  );
}

export default ImageListBlock;
