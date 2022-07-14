import React, { useState } from "react";
import { connect } from "react-redux";
import { ImageDto } from "utils/types";
import "./ImageList.css";
import ImgBlock from "components/ImageBlock";
interface ImageListProps {
  name: string;
}

function ImageList({ name }: ImageListProps) {
  const [fileImage, setFileImage] = useState("");
  const [imgList, setImgList]: [ImageDto[], any] = useState([]);
  const [count, setCount]: [number, any] = useState(0);
  const [curPage, setPage]: [number, any] = useState(0);

  const saveFileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    console.log(name);
    setImgList((imgList) => [
      ...imgList,
      {
        url: URL.createObjectURL(event.target.files[0]),
        id: count,
      },
    ]);
    setCount((count) => count + 1);
    console.log(imgList);
  };

  const deleteFileImage = (id) => {
    setImgList(imgList.filter((img) => img.id !== id));
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
      <div className="grid grid-cols-4 gap-4">
        <label className="h-60 w-60 col-span-1" htmlFor={name}></label>

        {imgList &&
          silceImage(imgList).map((img) => (
            <ImgBlock
              key={img.id}
              object={img}
              deleteFileImage={deleteFileImage}
            />
          ))}
      </div>

      <div>
        <input
          id={name}
          className="hidden"
          name="imageUpload"
          type="file"
          accept="image/*"
          onChange={saveFileImage}
        />
      </div>
    </div>
  );
}

export default ImageList;
