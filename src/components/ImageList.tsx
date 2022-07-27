import React, { useRef, useState } from "react";
import "./ImageList.css";
import ImgBlock from "components/ImageBlock";
//import uuid from "react-uuid";
import { v4 as uuidv4 } from "uuid";
import { Linter } from "eslint";


/**
 * @name : Teawon
 * @component :ImageList - name , picture리스트를 통해 특정 유저에 대한 사진리스트를 관리하는 컴포넌트
 * @create-data: 2022-07-15
 */

interface ImageListProps {
  object: any;
  changeFuc: any;
  checkFuc: any;
}

function ImageList({ object, changeFuc, checkFuc }: ImageListProps) {
  const imageInput = useRef<any>();
  const imgList = useState(object);
  const count: number = object.whitelistFaceImages.length; //해당 컴포넌트가 가지고있는 list개수
  const [curPage, setPage]: [number, any] = useState<number>(0); //curPage를 기점으로 curPage~curPage3까지의 요소만 보여줌
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(object.whitelistFaceName);
  const [bChecked, setChecked] = useState(false);

  const checkHandler = ({ target }) => {
    setChecked(!bChecked);
    checkFuc(object.whitelistFaceId, target.checked);
  };

  /**
   * @name : Teawon
   * @function :saveFileImageNew - 사진을 입력받아 리스트에 저장하는 함수
   * @create-data: 2022-07-15
   */
  const saveFileImageNew = (event: React.ChangeEvent<HTMLInputElement>) => {
    let data = {
      url: URL.createObjectURL(event.target.files[0]),
      id: uuidv4(),
      file: event.target.files[0],
    };

    changeFuc(data, object, "add");
  };

  /**
   * @name : Teawon
   * @function :deleteFileImage - 특정 사진을 지우는 함수 (부모의 상태값 갱신함수 changeFuc 호출)
   * @param :
   * id - 특정 사진의 id값 (식별용)
   * @create-data: 2022-07-15
   */
  const deleteFileImage = (id) => {
    changeFuc(id, object, "deleteImg");
    if (curPage > 0) {
      setPage((curPage) => curPage - 1);
    }
  };

  /**
   * @name : Teawon
   * @function :deleteFileImage - 전체 리스트컴포넌트를 지우는 함수 (부모의 상태값 갱신함수 changeFuc 호출)
   */
  const deleteFileImageList = () => {
    changeFuc(null, object, "deleteList");
  };

  /**
   * @name : Teawon
   * @function :silceImage - 해당 리스트컴포넌트에서 총 3개의 이미지만 보여주도록 slice하는 함수
   * @param :
   * imgList - 이미지 리스트
   */
  const silceImage = (imgList) => {
    // const reverse = [...imgList.reverse()];
    // let temp = [...imgList[0]].reverse();
    //temp.reverse();
    let currentPosts = [];
    let reverse = [...imgList].reverse();
    console.log(imgList);
    currentPosts = reverse.slice(curPage, curPage + 3);
    console.log(curPage);

    return currentPosts;
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setEdit((edit) => !edit);
      if (object.name !== text) {
        changeFuc(text, object, "reName");
      }
    }
  };

  const changeEditMode = () => {
    setEdit((edit) => !edit);
  };
  return (
    <div className="pictureList">
      <input
        type="checkbox"
        checked={bChecked}
        onChange={(e) => checkHandler(e)}
      />
      <div className="personName">
        {edit ? (
          <input
            className="form-control text-black w-32"
            type="text"
            value={text}
            onChange={(event) => handleChange(event)}
            onKeyDown={handleKeyDown}
          />
        </button>
        <li className="personName">
          {edit ? (
            <input
              // className="form-control text-black w-32"
              type="text"
              value={text}
              onChange={(event) => handleChange(event)}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <span onDoubleClick={() => changeEditMode()}>{text}</span>
          )}
        </li>

        {/* <p className="personName"> {object.name} </p> */}
        <li>
          <button
            className="show flex items-center"
            onClick={() =>
              setPage((curPage) => (curPage > 0 ? curPage - 1 : curPage))
            }
          >
            <img
              src="images/iconoir_nav-arrow-left.png"
              alt=""
              className="justify-center"
            />
          </button>
        </li>

        <li className="g grid grid-cols-4 gap-4">
          <span
            className="col-span-1 uploadButton flex justify-center"
            onClick={() => imageInput.current.click()}
          >
            <img src="images\addImage.png" alt="" className="h-36 w-36" />
          </span>

        {imgList[0].whitelistFaceImages &&
          silceImage(imgList[0].whitelistFaceImages).map((img) => (
            <ImgBlock
              key={img.id}
              object={img}
              deleteFileImage={deleteFileImage}
            />
          </button>
        </li>
      </ul>
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
