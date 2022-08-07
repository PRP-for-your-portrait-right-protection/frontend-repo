import React, { useRef, useState, useEffect } from "react";
import "./ImageList.css";
import ImgBlock from "./ImageBlock";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";
import { whiteFaceImageListsDto, saveImageFileDto } from "../../utils/types";

/**
 * @name : Teawon
 * @component :ImageList - name , picture리스트를 통해 특정 유저에 대한 사진리스트를 관리하는 컴포넌트
 * @create-data: 2022-07-15
 */

interface ImageListProps {
  whiteFaceImageLists: whiteFaceImageListsDto;
  changeFuc: (saveImageFileDto, whiteFaceImageListsDto, string) => void;
  checkFuc: (string, boolean) => void;
  checked: boolean;
  isNobodyNotChecked: boolean;
}

function ImageList({
  whiteFaceImageLists,
  changeFuc,
  checkFuc,
  checked,
  isNobodyNotChecked,
}: ImageListProps) {
  const imageInput = useRef<HTMLInputElement>();
  const count: number = whiteFaceImageLists.whitelistFaceImages.length; //해당 컴포넌트가 가지고있는 list개수
  const [curPage, setPage] = useState<number>(0); //curPage를 기점으로 curPage~curPage3까지의 요소만 보여줌
  const perPageSize = 3;
  const [edit, setEdit] = useState<boolean>(false); //텍스트 변경을 위한 inputBox 활성화 여부
  const [text, setText] = useState<string>(
    whiteFaceImageLists.whitelistFaceName
  ); //리스트 이미지 텍스트 변경을 위한 변수
  const [bChecked, setChecked] = useState<boolean>(checked); //체크박스 활성화 여부

  const allCheckHandler = () => {
    if (isNobodyNotChecked) setChecked(false);
  };

  useEffect(() => allCheckHandler(), [isNobodyNotChecked]);

  /**
   * @name : Teawon
   * @function :checkHandler - 체크박스 활성화 및 변경 함수
   * @create-data: 2022-07-27
   */
  const checkHandler = ({ target }) => {
    if (count != 0) {
      setChecked(!bChecked);
      checkFuc(whiteFaceImageLists.whitelistFaceId, target.checked);
    }
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

    changeFuc(data, whiteFaceImageLists, "add");
  };

  /**
   * @name : Teawon
   * @function :deleteFileImage - 전체 리스트컴포넌트를 지우는 함수 (부모의 상태값 갱신함수 changeFuc 호출)
   */
  const deleteFileImageList = () => {
    changeFuc(null, whiteFaceImageLists, "deleteList");
  };

  const useConfirm = (message = null, onConfirm, onCancel) => {
    if (!onConfirm || typeof onConfirm !== "function") {
      return;
    }
    if (onCancel && typeof onCancel !== "function") {
      return;
    }

    const confirmAction = () => {
      if (window.confirm(message)) {
        onConfirm();
      } else {
        onCancel();
      }
    };
    confirmAction();
  };
  const deleteConfirm = () => {
    deleteFileImageList();
  };

  const cancelConfirm = () => {};

  const confirmDelete = () => {
    useConfirm(
      "Are you sure you want to delete it?",
      deleteConfirm,
      cancelConfirm
    );
  };

  /**
   * @name : Teawon
   * @function :deleteFileImage - 특정 사진을 지우는 함수 (부모의 상태값 갱신함수 changeFuc 호출)
   * @param :
   * id - 특정 사진의 id값 (식별용)
   * @create-data: 2022-07-15
   */
  const deleteFileImage = (id) => {
    if (count == 1) {
      if (bChecked == true) {
        setChecked(false);
        checkFuc(whiteFaceImageLists.whitelistFaceId, false);
      }
    }
    changeFuc(id, whiteFaceImageLists, "deleteImg");
    if (curPage > 0) {
      setPage((curPage) => curPage - 1);
    }
  };

  /**
   * @name : Teawon
   * @function :silceImage - 해당 리스트컴포넌트에서 총 3개의 이미지만 보여주도록 slice하는 함수
   * @param :
   * imgList - 이미지 리스트
   */
  const silceImage = (imgList) => {
    let currentPosts = [];
    let reverse = [...imgList].reverse();
    currentPosts = reverse.slice(curPage, curPage + perPageSize);
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
      if (whiteFaceImageLists.whitelistFaceName !== text) {
        changeFuc(text, whiteFaceImageLists, "reName");
      }
    }
  };

  const changeEditMode = () => {
    setEdit((edit) => !edit);
  };
  return (
    <div className="wrapImage">
      <ol className="box">
        <ul className="pictureList justify-between">
          <li className="flex items-center float-left">
            <div className="checkbox">
              <input
                type="checkbox"
                name="check"
                id="check"
                value="1"
                className="checkbox1"
                checked={bChecked}
                onChange={(e) => checkHandler(e)}
              />
            </div>

            <div className="personName">
              {edit ? (
                <input
                  className="text-black text-center text-4xl w-40 border-0 hover:outline-offset-0"
                  type="text"
                  value={text}
                  onChange={(event) => handleChange(event)}
                  onKeyDown={handleKeyDown}
                  maxLength={50}
                />
              ) : (
                <span
                  className="text-4xl"
                  onDoubleClick={() => changeEditMode()}
                >
                  {text}
                </span>
              )}
            </div>
          </li>
          <li className="float-right ">
            <button onClick={() => confirmDelete()}>
              <img
                className="w-8 justify-center items-center"
                alt="deleteBtn"
                src="images\close.png"
              />
            </button>
          </li>
        </ul>

        <li className="pictureList1">
          {/* <p className="personName"> {object.name} </p> */}
          {perPageSize < count ? (
            <div>
              <button
                className="show flex items-center justify-center"
                onClick={() =>
                  setPage((curPage) => (curPage > 0 ? curPage - 1 : curPage))
                }
              >
                <AiOutlineLeft
                  size="40"
                  justify-content="center"
                  place-content="center"
                  color="#767093"
                />
              </button>
            </div>
          ) : null}

          <div className="g grid grid-cols-4 gap-8">
            <span
              className="col-span-1 flex justify-center"
              onClick={() => imageInput.current.click()}
            >
              <img src="images\frame.png" alt="" className="h-36 w-36" />
            </span>

            {whiteFaceImageLists.whitelistFaceImages &&
              silceImage(whiteFaceImageLists.whitelistFaceImages).map((img) => (
                <ImgBlock
                  key={img.id}
                  whiteFaceImageDto={img}
                  deleteFileImage={deleteFileImage}
                />
              ))}
          </div>
          {perPageSize < count ? (
            <div>
              <button
                className="show flex items-center justify-center"
                onClick={() =>
                  setPage((curPage) =>
                    count > perPageSize && count - curPage > perPageSize
                      ? curPage + 1
                      : curPage
                  )
                }
              >
                <AiOutlineRight
                  size="40"
                  justify-content="center"
                  place-content="center"
                  color="#767093"
                />
              </button>
            </div>
          ) : null}
        </li>
      </ol>

      <div>
        <input
          ref={imageInput}
          id={whiteFaceImageLists.whitelistFaceName}
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
