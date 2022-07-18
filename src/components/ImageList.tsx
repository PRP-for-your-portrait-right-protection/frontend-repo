import React, { useRef, useState } from "react";
import "./ImageList.css";
import ImgBlock from "components/ImageBlock";
import PhotoLandingPage from "components/PhotoLandingPage";
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
  const imageInput = useRef<any>();
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
      file: event.target.files[0],
      new: "Y",
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

  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(object.name);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setEdit((edit) => !edit);
    }
  };

  const changeEditMode = () => {
    setEdit((edit) => !edit);
  };
  return (
    <div className="pictureList">
      <div className="personName">
        {edit ? (
          <input
            className="form-control text-black w-32"
            type="text"
            value={text}
            onChange={(event) => handleChange(event)}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <span onDoubleClick={() => changeEditMode()}>{text}</span>
        )}
      </div>

      {/* <p className="personName"> {object.name} </p> */}
      <button className="d" onClick={() => deleteFileImageList()}>
        <img className="deleteBtn" alt="deleteBtn" src="images\delete.png" />
      </button>
      <button
        className="showNext"
        onClick={() =>
          setPage((curPage) =>
            count > 3 && count - curPage > 3 ? curPage + 1 : curPage
          )
        }
      ></button>
      <button
        className="showPre"
        onClick={() =>
          setPage((curPage) => (curPage > 0 ? curPage - 1 : curPage))
        }
      ></button>

      <div className="grid grid-cols-4 gap-4 mx-96">
        <span
          className="col-span-1 uploadButton flex justify-center"
          onClick={() => imageInput.current.click()}
        >
          <img src="images\addImage.png" alt="" className="h-36 w-36" />
        </span>

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
          ref={imageInput}
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
