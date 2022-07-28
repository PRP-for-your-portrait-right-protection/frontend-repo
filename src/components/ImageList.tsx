import React, { useRef, useState } from "react";
import "./ImageList.css";
import ImgBlock from "../components/ImageBlock";
import uuid from "react-uuid";

/**
 * @name : Teawon
 * @component :ImageList - name , picture리스트를 통해 특정 유저에 대한 사진리스트를 관리하는 컴포넌트
 * @create-data: 2022-07-15
 */

interface ImageListProps {
  object: any;
  changeFuc: any;
  checkFuc: any;
  checked: boolean;
}

function ImageList({ object, changeFuc, checkFuc, checked }: ImageListProps) {
  const imageInput = useRef<any>();
  const imgList = useState(object); //특정 리스트의 이미지 데이터
  const count: number = object.whitelistFaceImages.length; //해당 컴포넌트가 가지고있는 list개수
  const [curPage, setPage]: [number, any] = useState<number>(0); //curPage를 기점으로 curPage~curPage3까지의 요소만 보여줌
  const [edit, setEdit] = useState(false); //텍스트 변경을 위한 inputBox 활성화 여부
  const [text, setText] = useState(object.whitelistFaceName); //리스트 이미지 텍스트 변경을 위한 변수
  const [bChecked, setChecked] = useState(checked); //체크박스 활성화 여부

  /**
   * @name : Teawon
   * @function :checkHandler - 체크박스 활성화 및 변경 함수
   * @create-data: 2022-07-27
   */
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

  /**
   * @name : Teawon
   * @function :handleChange - 이름 변경 함수
   * @param :
   * imgList - 이미지 리스트
   */
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
    <div className="wrapImage">
      <ul className="pictureList">
        <li className="checkbox">
          <input
            type="checkbox"
            name="check"
            id="check"
            value="1"
            className="checkbox1"
            checked={bChecked}
            onChange={(e) => checkHandler(e)}
          />
        </li>

        <li className="personName">
          {edit ? (
            <input
              type="text"
              value={text}
              onChange={(event) => handleChange(event)}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <span onDoubleClick={() => changeEditMode()}>{text}</span>
          )}
        </li>
        <button className="p-2" onClick={() => deleteFileImageList()}>
          <img
            className="w-8 justify-center items-center"
            alt="deleteBtn"
            src="images\delete.png"
          />
        </button>

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
            ))}
        </li>
        <li>
          <button
            className="show flex items-center"
            onClick={() =>
              setPage((curPage) =>
                count > 3 && count - curPage > 3 ? curPage + 1 : curPage
              )
            }
          >
            <img
              src="images/iconoir_nav-arrow-right.png"
              alt=""
              className="justify-center"
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
