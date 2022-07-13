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
  const [count, setCount]: [number, any] = useState(1);

  const saveFileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
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
  };

  return (
    <div className="imageList-component mt-28">
      <p> {name} </p>

      <div className="grid grid-cols-3 gap-4">
        <label className="h-60 w-60 col-span-1" htmlFor="input-file"></label>

        {imgList &&
          imgList.map((img) => (
            <ImgBlock
              key={img.id}
              object={img}
              deleteFileImage={deleteFileImage}
            />
          ))}
      </div>

      <div>
        <input
          id="input-file"
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
