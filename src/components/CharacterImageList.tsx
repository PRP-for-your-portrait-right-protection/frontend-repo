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
  characterList: string[]; //기존 이미지 리스트
  userCharacterList: string[]; //사용자 이미지 리스트
  clickFuc: any; //상태값 변경 함수(부모), 선택된 파일의 URL(혹은 File.name)을 저장한다.
  preSelectedImage: string; //기존에 선택되었던 정보가 담겨있는 url
  inputCharacteList: string[]; //사용자로부터 입력된 이미지 리스트
  insertFuc: any; //상태값 변경 함수(부모), 이미지의 정보를 리스트에 추가
}

function CharacterImageList({
  characterList,
  userCharacterList,
  clickFuc,
  preSelectedImage,
  inputCharacteList,
  insertFuc,
}: ImageListProps) {
  const countFix: number = characterList.length; // 기존 이미지 리스트의 개수
  const countUser: number = userCharacterList.length; //사용자 이미지 리스트의 개수
  const countNew: number = inputCharacteList.length; // 새로 입력된 이미지 리스트의 개수
  const [selectedId, setSeselectedId] = useState<string>(preSelectedImage); //선택된 이미지 id
  const [curPage, setPage]: [number, any] = useState<number>(0); //curPage를 기점으로 curPage~curPage3까지의 요소만 보여줌
  const [curPageUser, setPageUser]: [number, any] = useState<number>(0); //curPage를 기점으로 curPage~curPage3까지의 요소만 보여줌
  const imageInput = useRef<any>();

  /**
   * @name : Teawon
   * @function :handleClickRadioButton - 선택된 이미지의 URL정보를 상태변화함수에 저장 및 해당 정보가 선택되었음을 변수에 저장
   * @create-data: 2022-07-18
   */

  const handleClickRadioButton = (e) => {
    setSeselectedId(e.target.value);
    clickFuc(e.target.value);
  };

  /**
   * @name : Teawon
   * @function :saveImage - 사용자가 새로 업로드한 사진을 저장한다
   * @create-data: 2022-07-18
   */
  const saveImage = (event) => {
    console.log(event.target.files[0]);
    insertFuc(event.target.files[0]);
    console.log(inputCharacteList);
  };

  /**
   * @name : Teawon
   * @function :silceImage - 해당 리스트컴포넌트에서 총 3개의 이미지만 보여주도록 slice하는 함수
   * @param :
   * imgList - 이미지 리스트
   * page - 해당 리스트가 가지는 page변수
   */
  const silceImage = (imglist, page) => {
    let currentPosts = [];

    let reverse = [...imglist].reverse();

    currentPosts = reverse.slice(page, page + 3);
    return currentPosts;
  };

  const silceImageC2 = (imglist, page) => {
    console.log("현재 페이지");
    console.log(page);

    console.log("추가 요소 개수");
    console.log(countNew);

    console.log("기존  개수");
    console.log(countUser);

    let currentPosts = [];

    let pre = page - countNew > 0 ? page - countNew : 0;
    let next = page - countNew + 3 > 0 ? page - countNew + 3 : 0;
    currentPosts = imglist.slice(pre, next);
    return currentPosts;
  };

  return (
    <div className="imageList-component">
      <div className="modalFont flex justify-center items-center mt-3 ">
        CHARACTER
      </div>
      <div className="flex content-center w-auto h-56">
        <button
          className="Pre inline-block justify-center mt-48"
          onClick={() =>
            setPage((curPage) =>
              countFix > 4 && countFix - curPage > 4 ? curPage + 1 : curPage
            )
          }
        ></button>
        <button
          className="Next inline-block justify-center mt-48 right-56"
          onClick={() =>
            setPage((curPage) => (curPage > 0 ? curPage - 1 : curPage))
          }
        ></button>

        <div className="grid grid-cols-4 gap-8 mx-32 mt-6">
          {characterList &&
            silceImage(characterList, curPage).map((img) => (
              <div className="col-span-1" key={img}>
                <label>
                  <input
                    type="radio"
                    className="hidden"
                    value={img}
                    checked={selectedId == img}
                    onChange={handleClickRadioButton}
                  />
                  <img className="h-40 w-48" alt="sample" src={img} />
                </label>
              </div>
            ))}
        </div>
      </div>

      <div className="modalFont2">MY CHARACTER</div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={() =>
          setPageUser((curPageUser) =>
            countUser + countNew > 3 && countUser + countNew - curPageUser > 3
              ? curPageUser + 1
              : curPageUser
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

        {inputCharacteList &&
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
          ))}

        {userCharacterList &&
          silceImageC2(userCharacterList, curPageUser).map((img) => (
            <div className="col-span-1 " key={img}>
              <label>
                <input
                  type="radio"
                  className="hidden"
                  value={img}
                  checked={selectedId == img}
                  onChange={handleClickRadioButton}
                />
                <img className="h-60 w-60" alt="sample" src={img} />
              </label>
            </div>
          ))}
      </div>
      {/* 
      {inputImage && (
        <div className="col-span-1 flex">
          <label>
            <input
              type="radio"
              className="hidden"
              value={inputImage}
              checked={selectedId == inputImage}
              onChange={handleClickRadioButton}
            />
            <img
              className="w-3/4 h-64"
              id="video"
              src={URL.createObjectURL(inputImage)}
            />
          </label>
        </div>
      )} */}

      {/*    <input
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

export default CharacterImageList;
