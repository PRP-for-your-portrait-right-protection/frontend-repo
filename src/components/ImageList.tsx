import React, { useState } from "react";
import "./ImageList.css";
import ImgBlock from "components/ImageBlock";

/**
 * @name : Teawon
 * @component :ImageList - name , picture리스트를 통해 특정 유저에 대한 사진리스트를 관리하는 컴포넌트
 * @create-data: 2022-07-15
 */

interface ImageListProps {
  object: any;
  changeFuc: any;
}

function ImageList({ object, changeFuc }: ImageListProps) {
  const imgList = useState(object);
  const [count, setCount]: [number, any] = useState<number>(0); //해당 컴포넌트가 가지고있는 list개수
  const [curPage, setPage]: [number, any] = useState<number>(0); //curPage를 기점으로 curPage~curPage3까지의 요소만 보여줌

  /**
   * @name : Teawon
   * @function :saveFileImageNew - 사진을 입력받아 리스트에 저장하는 함수
   * @create-data: 2022-07-15
   */
  const saveFileImageNew = (event: React.ChangeEvent<HTMLInputElement>) => {
    let data = {
      url: URL.createObjectURL(event.target.files[0]),
      id: count,
    };

    changeFuc(data, object.name, "add");
    setCount((count) => count + 1);
  };

  /**
   * @name : Teawon
   * @function :deleteFileImage - 특정 사진을 지우는 함수 (부모의 상태값 갱신함수 changeFuc 호출)
   * @param :
   * id - 특정 사진의 id값 (식별용)
   * @create-data: 2022-07-15
   */
  const deleteFileImage = (id) => {
    changeFuc(id, object.name, "deleteImg");
    if (curPage > 0) {
      setPage((curPage) => curPage - 1);
    }
  };

  /**
   * @name : Teawon
   * @function :deleteFileImage - 전체 리스트컴포넌트를 지우는 함수 (부모의 상태값 갱신함수 changeFuc 호출)
   */
  const deleteFileImageList = () => {
    changeFuc(null, object.name, "deleteList");
  };

  /**
   * @name : Teawon
   * @function :silceImage - 해당 리스트컴포넌트에서 총 3개의 이미지만 보여주도록 slice하는 함수
   * @param :
   * imgList - 이미지 리스트
   */
  const silceImage = (imgList) => {
    let currentPosts = [];
    currentPosts = imgList[0].pictures.slice(curPage, curPage + 3);
    console.log(curPage);
    return currentPosts;
  };

  return (
    <div className="imageList-component mt-28">
      <p> {object.name} </p>
      <button onClick={() => deleteFileImageList()}>
        <img
          className="absolute  h-5 w-5"
          alt="deleteBtn"
          src="images/deleteButton.png"
        />
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={() =>
          setPage((curPage) =>
            count > 3 && count - curPage > 3 ? curPage + 1 : curPage
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
        <label className="h-60 w-60 col-span-1" htmlFor={object.name}></label>

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
