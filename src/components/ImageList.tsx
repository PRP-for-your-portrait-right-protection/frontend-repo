import React, { useState } from "react";
import { connect } from "react-redux";
import { ImageDto } from "utils/types";
import "./ImageList.css";
import ImgBlock from "components/ImageBlock";
interface ImageListProps {
  object: any;
  changeFuc: any;
}

function ImageList({ object, changeFuc }: ImageListProps) {
  const imgList = useState(object);
  const [count, setCount]: [number, any] = useState(0);
  const [curPage, setPage]: [number, any] = useState(0);

  const saveFileImageNew = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("pre");
    console.log(imgList);
    let data = {
      url: URL.createObjectURL(event.target.files[0]),
      id: count,
    };
    console.log("picture 배열에 추가될 요소");
    console.log(object);
    changeFuc(data, object.name);
    setCount((count) => count + 1);
    console.log("next");
    console.log(imgList);
  };

  // const saveFileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   // @ts-ignore
  //   console.log(name);
  //   setImgList((imgList) => [
  //     ...imgList,
  //     {
  //       url: URL.createObjectURL(event.target.files[0]),
  //       id: count,
  //     },
  //   ]);
  //   setCount((count) => count + 1);
  //   console.log(imgList);
  // };

  const deleteFileImage = (id) => {
    // setImgList(imgList.filter((img) => img.id !== id));
    if (curPage > 0) {
      setPage((curPage) => curPage - 1);
    }
  };

  const silceImage = (imgList) => {
    let currentPosts = [];
    currentPosts = imgList.slice(curPage, curPage + 3);
    console.log(curPage);
    return currentPosts;
  };

  return (
    <div className="imageList-component mt-28">
      <p> {name} </p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={() =>
          setPage((curPage) =>
            imgList.length > 3 && imgList.length - curPage > 3
              ? curPage + 1
              : curPage
          )
        }
      >
        Next
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={() =>
          setPage((curPage) => (curPage > 0 ? curPage - 1 : curPage))
        }
      >
        Pre
      </button>

      <button
        className="bg-yello-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={() => console.log(imgList)}
      >
        Pre
      </button>

      <div className="grid grid-cols-4 gap-4">
        <label className="h-60 w-60 col-span-1" htmlFor={object.name}></label>

        {imgList &&
          silceImage(imgList).map((img) => (
            <ImgBlock
              key={img.id}
              object={img[0]}
              deleteFileImage={deleteFileImage}
            />
          ))}
      </div>

      <div>
        <input
          id={object.name}
          className="hidden"
          name="imageUpload"
          type="file"
          accept="image/*"
          onChange={saveFileImageNew}
        />
      </div>
    </div>
  );
}

export default ImageList;
