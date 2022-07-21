import React, { useRef, useState } from "react";
import "./CharacterImageList.css";
/**
 * @name : Teawon
 * @component :CharacterImageList - 기존 이미지리스트, 사용자 이미지 리스트 변수를 받아
  하나의 클릭된 이미지정보를  부모컴포넌트의 상태변경함수에 넣는 컴포넌트
 * @create-data: 2022-07-18
 * @개선사항 : 컴포넌트화가 이루어지지 않고, 두 고정된 이미지 리스트(기존, 사용자)가 중복되어 사용되고있습니다.
 * Radio타입의 특징 상 상대방 컴포넌트의 특정 이미지가 눌렸을 때 다른 컴포넌트에서 변수값의 변화를 확인해야하는데 모든 컴포넌트마다 상태변경함수를 넣어
 * 관리하는 방식은 좋지 않을 것 같아 고민중입니다. 향후 적절한 모듈화가 필요합니다.
 */

interface ImageListProps {
  characterList: any; //이미지 리스트
  userCharacterList: any; //이미지 리스트
  clickFuc: any; //상태값 변경 함수(부모), 선택된 파일의 URL을 저장한다.
  preSelectedImage: string;
}

function CharacterImageList({
  characterList,
  userCharacterList,
  clickFuc,
  preSelectedImage,
}: ImageListProps) {
  const countFix: number = characterList.length; //해당 컴포넌트가 가지고있는 list개수
  const countNew: number = userCharacterList.length; //해당 컴포넌트가 가지고있는 list개수
  const [selectedId, setSeselectedId] = useState<string>(preSelectedImage); //선택된 이미지 id

  const [curPage, setPage]: [number, any] = useState<number>(0); //curPage를 기점으로 curPage~curPage3까지의 요소만 보여줌
  const [curPageUser, setPageUser]: [number, any] = useState<number>(0); //curPage를 기점으로 curPage~curPage3까지의 요소만 보여줌

  const imageInput = useRef<any>();
  const [inputImage, setInputImage] = useState<any>([]); //사용자가 새로 입력한 이미지

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
    setInputImage([...inputImage, event.target.files[0]]);
    console.log(inputImage);
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
    console.log(imglist);

    currentPosts = reverse.slice(page, page + 3);
    return currentPosts;
  };

  const silceImageC2 = (imglist, page) => {
    console.log("현재 페이지");
    console.log(page);

    console.log("추가 요소 개수");
    console.log(inputImage.length);

    console.log("기존  개수");
    console.log(countNew);

    let currentPosts = [];

    let pre = page - inputImage.length > 0 ? page - inputImage.length : 0;
    let next =
      page - inputImage.length + 3 > 0 ? page - inputImage.length + 3 : 0;
    currentPosts = imglist.slice(pre, next);
    return currentPosts;
  };

  const makeFormData = () => {
    console.log("선택된 이미지");
    console.log(selectedId);

    const checkUrl = process.env.REACT_APP_BUCKET_URL;
    console.log(checkUrl);

    if (selectedId.startsWith(checkUrl)) {
      console.log("선택된 내용이 파일이 아닙니다.");
      //backend로 모든 입력된 파일만 보낸 후 , url은 받지않고 기존값 기록해서 넘기기
    } else {
      console.log("선택된 내용이 파일입니다.");

      //backend api통신 후 , 해당 파일값만 selected로 보내기
      //그리고 받은 url정보를 기록해서 다음페이지로 이동
    }
    sessionStorage.setItem("character", selectedId);
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
            countNew + inputImage.length > 3 &&
            countNew + inputImage.length - curPageUser > 3
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

        {inputImage &&
          silceImage(inputImage, curPageUser).map((img) => (
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

      <button //ImgList추가 버튼
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => makeFormData()}
      >
        Make
      </button>
    </div>
  );
}

export default CharacterImageList;
