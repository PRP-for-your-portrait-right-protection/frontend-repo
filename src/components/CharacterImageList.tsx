import React, { useRef, useState } from "react";
import "./CharacterImageList.css";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";
import { characterRequestDto } from "../utils/types";
/**
 * @name : Teawon
 * @component :CharacterImageList - 기존 이미지리스트, 사용자 이미지 리스트 변수를 받아
  하나의 클릭된 이미지정보를  부모컴포넌트의 상태변경함수에 넣는 컴포넌트
 * @create-data: 2022-07-18
   @update-date: 2022-07-22
   - 사용자로부터 새로 입력된 데이터를 부모컴포넌트에서 관리하며 자식컴포넌트에서는 값을 받아서 사용
   - 추가한 데이터를 Modal창을 닫았다가 다시 띄웠을 때 기존 데이터를 유지
   - 사용자로부터 여러 이미지를 업로드 할 수 있고 하나의 리스트로 표현됨
 *
 */
interface ImageListProps {
  characterList: string[]; //기존 이미지 리스트
  userCharacterList: string[]; //사용자 이미지 리스트
  clickFuc: (characterRequestDto) => void; //상태값 변경 함수(부모), 선택된 파일의 URL(혹은 File.name)을 저장한다.
  preSelectedImage: characterRequestDto; //기존에 선택되었던 정보가 담겨있는 url
  insertFuc: (File) => void; //상태값 변경 함수(부모), 이미지의 정보를 리스트에 추가
  deleteFuc: (number) => void;
}
function CharacterImageList({
  characterList,
  userCharacterList,
  clickFuc,
  preSelectedImage,
  insertFuc,
  deleteFuc,
}: ImageListProps) {
  const countFix: number = characterList.length; // 기존 이미지 리스트의 개수
  const countUser: number = userCharacterList.length; //사용자 이미지 리스트의 개수
  const [selectedObject, setSelectedObject] =
    useState<characterRequestDto>(preSelectedImage); //선택된 이미지 id
  const [curPage, setPage] = useState<number>(0); //curPage를 기점으로 curPage~curPage3까지의 요소만 보여줌
  const [curPageUser, setPageUser] = useState<number>(0); //curPage를 기점으로 curPage~curPage3까지의 요소만 보여줌
  const imageInput = useRef<HTMLInputElement>();
  const perPageFixSize = 4;
  const perUserPageSize = 3;
  /**
   * @name : Teawon
   * @function :handleClickRadioButton - 선택된 이미지의 URL정보를 상태변화함수에 저장 및 해당 정보가 선택되었음을 변수에 저장
   * @create-data: 2022-07-18
   */
  const handleClickRadioButton = (e) => {
    setSelectedObject(JSON.parse(e.target.value));
    clickFuc(JSON.parse(e.target.value));
  };
  /**
   * @name : Teawon
   * @function :saveImage - 사용자가 새로 업로드한 사진을 저장한다
   * @create-data: 2022-07-18
   */
  const saveImage = (event) => {
    insertFuc(event.target.files[0]);
  };
  /**
   * @name : Teawon
   * @function :silceImage - 해당 리스트컴포넌트에서 총 3개의 이미지만 보여주도록 slice하는 함수
   * @param :
   * imgList - 이미지 리스트
   * page - 해당 리스트가 가지는 page변수
   * count - 해당 리스트에서 보여줄 개수
   * @update-date 2022.7.28
   * - 보여줄 개수 Param추가
   */
  const silceImage = (imglist, page, count) => {
    let currentPosts = [];
    let reverse = [...imglist].reverse();
    currentPosts = reverse.slice(page, page + count);
    return currentPosts;
  };
  /**
   * @name : Teawon
   * @function :deleteCharacterImage - 특정 이미지 삭제 함수
   * @param :
   * imgID - 삭제할 캐릭터 이미지 ID
   */
  const deleteCharacterImage = (imgId) => {
    deleteFuc(imgId);
  };
  return (
    <div className="imageList-component2">
      <div>
        <div className="modalFont my-5 mb-5">CHARACTER</div>
        <li className="inline-block flex items-center justify-center space-x-16 mt-5 ">
          {perPageFixSize < countFix ? (
            <button
              className="flex w-16 h-16"
              onClick={() =>
                setPage((curPage) => (curPage > 0 ? curPage - 1 : curPage))
              }
            >
              <AiOutlineLeft
                size="64"
                justify-content="center"
                place-content="center"
                color="#767093"
              />
            </button>
          ) : null}

          <div className="grid grid-cols-4 gap-4">
            {characterList &&
              silceImage(characterList, curPage, perPageFixSize).map((img) => (
                <div className="col-span-1" key={img.id}>
                  <label>
                    <input
                      type="radio"
                      className="hidden"
                      value={JSON.stringify(img)}
                      checked={selectedObject.id == img.id}
                      onChange={handleClickRadioButton}
                    />
                    <img
                      className="object-cover h-48 w-48"
                      alt="sample"
                      src={img.url}
                    />
                  </label>
                </div>
              ))}
          </div>
          {perPageFixSize < countFix ? (
            <button
              className="flex w-16 h-16"
              onClick={() =>
                setPage((curPage) =>
                  countFix > perPageFixSize &&
                  countFix - curPage > perPageFixSize
                    ? curPage + 1
                    : curPage
                )
              }
            >
              <AiOutlineRight
                size="64"
                justify-content="center"
                place-content="center"
                color="#767093"
              />
            </button>
          ) : null}
        </li>
      </div>
      <div className="mt-8">
        <div className="modalFont">MY CHARACTER</div>
        <li className="inline-block flex items-center justify-center space-x-16 mt-5 ">
          {perUserPageSize < countUser ? (
            <button
              className="flex w-16 h-16 mt-3"
              onClick={() =>
                setPageUser((curPageUser) =>
                  curPageUser > 0 ? curPageUser - 1 : curPageUser
                )
              }
            >
              <AiOutlineLeft
                size="64"
                justify-content="center"
                place-content="center"
                color="#767093"
              />
            </button>
          ) : null}

          <div className="grid grid-cols-4 gap-8">
            <span
              className="col-span-1 flex justify-center"
              onClick={() => imageInput.current.click()}
            >
              <img src="images\frame.png" alt="" className="flex h-48 w-48" />
            </span>
            {userCharacterList &&
              silceImage(userCharacterList, curPageUser, perUserPageSize).map(
                (img) => (
                  <div
                    className="col-span-1 relative justify-center"
                    key={img.id}
                  >
                    <label>
                      <input
                        type="radio"
                        className="hidden"
                        value={JSON.stringify(img)}
                        checked={selectedObject.id == img.id}
                        onChange={handleClickRadioButton}
                      />
                      <img
                        className="h-48 w-48 z-10 object-cover"
                        alt="sample"
                        src={img.url}
                      />
                    </label>
                    <button
                      onClick={() => deleteCharacterImage(img.id)}
                      className="absolute top-0 right-0 h-8 w-8"
                    >
                      <img
                        className="absolute w-8 h-8 right-0 top-0"
                        alt="deleteBtn"
                        src="images/negative.png"
                      />
                    </button>
                  </div>
                )
              )}
          </div>
          {perUserPageSize < countUser ? (
            <button
              className="flex w-16 h-16 mt-3"
              onClick={() =>
                setPageUser((curPageUser) =>
                  countUser > perUserPageSize &&
                  countUser - curPageUser > perUserPageSize
                    ? curPageUser + 1
                    : curPageUser
                )
              }
            >
              <AiOutlineRight
                size="64"
                justify-content="center"
                place-content="center"
                color="#767093"
              />
            </button>
          ) : null}
        </li>
      </div>
      <input
        ref={imageInput}
        className="hidden"
        name="imageUpload"
        type="file"
        accept="image/*"
        onChange={saveImage}
      />{" "}
    </div>
  );
}
export default CharacterImageList;
