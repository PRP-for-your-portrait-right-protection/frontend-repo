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
  userCharacterList: any; //사용자 이미지 리스트
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
   * @function :saveImage - 사용자가 새로 업로드한 사진을 저장한다
   * @create-data: 2022-07-18
   */
  const saveImage = (event) => {
    insertFuc(event.target.files[0]);
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
    <div className="imageList-component">
      <div className="g grid grid-cols-4 gap-12">
        <div
          className="col-span-1 flex justify-center"
          onClick={() => imageInput.current.click()}
        >
          <img
            src="images\frame.png"
            alt=""
            className="object-cover h-60 w-60"
          />
        </div>

        {userCharacterList &&
          userCharacterList.map((img) => (
            <div className="relative w-60 h-60" key={img.id}>
              <img className="flex h-60 w-60" alt="sample" src={img.url} />

              <button onClick={() => deleteCharacterImage(img.id)}>
                <img
                  className="absolute w-8 h-8 right-0 top-0"
                  alt="deleteBtn"
                  src="images/negative.png"
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

{
  /* <div className="g grid grid-cols-4 gap-8">
            <span
              className="col-span-1 flex justify-center"
              onClick={() => imageInput.current.click()}
            >
              <img src="images\frame.png" alt="" className="h-36 w-36" />
            </span> */
}
