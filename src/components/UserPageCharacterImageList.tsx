import React, { useRef, useState } from "react";
import "./CharacterImageList.css";
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
  userCharacterList: string[]; //사용자 이미지 리스
  insertFuc: any; //상태값 변경 함수(부모), 이미지의 정보를 리스트에 추가
  deleteFuc: any;
}

function UserPageCharacterImageList({
  userCharacterList,
  insertFuc,
  deleteFuc,
}: ImageListProps) {
  const countUser: number = userCharacterList.length; //사용자 이미지 리스트의 개수

  const [curPageUser, setPageUser]: [number, any] = useState<number>(0); //curPage를 기점으로 curPage~curPage3까지의 요소만 보여줌
  const imageInput = useRef<any>();

  /**
   * @name : Teawon
   * @function :handleClickRadioButton - 선택된 이미지의 URL정보를 상태변화함수에 저장 및 해당 정보가 선택되었음을 변수에 저장
   * @create-data: 2022-07-18
   */

  /**
   * @name : Teawon
   * @function :saveImage - 사용자가 새로 업로드한 사진을 저장한다
   * @create-data: 2022-07-18
   */
  const saveImage = (event) => {
    console.log(event.target.files[0]);
    insertFuc(event.target.files[0]);
  };

  /**
   * @name : Teawon
   * @function :silceImage - 해당 리스트컴포넌트에서 총 3개의 이미지만 보여주도록 slice하는 함수
   * @param :
   * imgList - 이미지 리스트
   * page - 해당 리스트가 가지는 page변수
   */
  const silceImage = (imglist, page) => {
    console.log("!!!");
    console.log(imglist);

    let currentPosts = [];

    let reverse = [...imglist].reverse();

    currentPosts = reverse.slice(page, page + 4);
    return currentPosts;
  };

  const deleteCharacterImage = (imgId) => {
    deleteFuc(imgId);
  };

  return (
    <div className="imageList-component">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={() =>
          setPageUser((curPageUser) =>
            curPageUser > 0 ? curPageUser - 1 : curPageUser
          )
        }
      >
        Next
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={() =>
          setPageUser((curPageUser) =>
            curPageUser > 0 ? curPageUser - 1 : curPageUser
          )
        }
      >
        Pre
      </button>

      <div className="grid grid-cols-4 gap-4">
        <span
          className="col-span-1 uploadButton flex justify-center"
          onClick={() => imageInput.current.click()}
        >
          <img src="images\addImage.png" alt="" className=" h-36 w-36" />
        </span>

        {/* {inputCharacteList &&
          silceImage(inputCharacteList, curPageUser).map((img) => (
            <div className="col-span-1" key={img.name}>
              <label>
                <input
                  type="radio"
                  className="hidden"
                  value={img.name}
                  checked={selectedId == img.name}
                  onChange={handleClickRadioButton}
                />
                <img
                  className="h-60 w-60"
                  alt="sample"
                  src={URL.createObjectURL(img)}
                />
              </label>
            </div>
          ))} */}

        {userCharacterList &&
          silceImage(userCharacterList, curPageUser).map((img) => (
            <div className="col-span-1 " key={img.id}>
              <img className="h-60 w-60" alt="sample" src={img.url} />

              <button onClick={() => deleteCharacterImage(img.id)}>
                <img
                  className="relative w-8 h-8 z-1 -top-14 -left-14"
                  alt="deleteBtn"
                  src="images/deleteButton.png"
                />
              </button>
            </div>
          ))}
      </div>

      <input
        ref={imageInput}
        className="hidden"
        name="imageUpload"
        type="file"
        accept="image/*"
        onChange={saveImage}
      />
    </div>
  );
}

export default UserPageCharacterImageList;
