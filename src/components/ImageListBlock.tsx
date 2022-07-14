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

  const changeFuc = (object, name, type) => {
    let findIndex = totalList.file.findIndex((element) => element.name == name);
    let copyArray = { ...totalList };
    if (type == "add") {
      console.log("복사전 현재 상태");
      console.log(totalList);
      console.log("들어갈 데이터!");
      console.log(object);
      console.log("들어갈 데이터가 속한 이름!");
      console.log(name);
      console.log("해당 속성의 인덱스!");
      console.log(findIndex);

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
    } else if (type == "delete") {
      console.log(object);
      console.log("copy내용(처리전)");
      console.log(copyArray);

      copyArray.file[findIndex].pictures = copyArray.file[
        findIndex
      ].pictures.filter((img) => img.id !== object);

      setTotalList(copyArray);
    } else {
      copyArray.file = copyArray.file.filter((list) => list.name !== name);
      setTotalList(copyArray);
    }
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
