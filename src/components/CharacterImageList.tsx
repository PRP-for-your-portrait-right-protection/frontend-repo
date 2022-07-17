import React, { useRef, useState } from "react";
import "./CharacterImageList.css";
/**
 * @name : Teawon
 * @component :ImageList - name , picture리스트를 통해 특정 유저에 대한 사진리스트를 관리하는 컴포넌트
 * @create-data: 2022-07-15
 */

interface ImageListProps {
  characterList: any;
  userCharacterList: any;
  clickFuc: any;
}

function CharacterImageList({
  characterList,
  userCharacterList,
  clickFuc,
}: ImageListProps) {
  const [count, setCount]: [number, any] = useState<number>(
    characterList.length
  ); //해당 컴포넌트가 가지고있는 list개수

  const [countUser, setCountUser]: [number, any] = useState<number>(
    userCharacterList.length
  ); //해당 컴포넌트가 가지고있는 list개수

  const [selectedId, setSeselectedId] = useState<number>(0); //선택된 이미지 id

  const handleClickRadioButton = (e) => {
    setSeselectedId(e.target.value);
    clickFuc([e.target.value]);
  };

  const handleClickRadioButtonUser = (e) => {
    setSeselectedId(e.target.value);
    clickFuc(e.target.value);
  };

  const [curPage, setPage]: [number, any] = useState<number>(0); //curPage를 기점으로 curPage~curPage3까지의 요소만 보여줌
  const [curPageUser, setPageUser]: [number, any] = useState<number>(0); //curPage를 기점으로 curPage~curPage3까지의 요소만 보여줌

  const imageInput = useRef<any>();
  const [inputImage, setInputImage] = useState<any>("");

  const saveImage = (event) => {
    setInputImage(event.target.files[0]);
  };

  /**
   * @name : Teawon
   * @function :silceImage - 해당 리스트컴포넌트에서 총 3개의 이미지만 보여주도록 slice하는 함수
   * @param :
   * imgList - 이미지 리스트
   */
  const silceImage = () => {
    let currentPosts = [];
    currentPosts = characterList.slice(curPage, curPage + 3);
    console.log(curPage);
    return currentPosts;
  };

  const silceImageUser = () => {
    let currentPosts = [];
    currentPosts = userCharacterList.slice(curPageUser, curPageUser + 3);
    console.log(curPageUser);
    return currentPosts;
  };

  return (
    <div className="imageList-component">
      <div className="modalFont1">CHARACTER</div>
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
        {characterList &&
          silceImage().map((img) => (
            <div className="col-span-1" key={img}>
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

      <br></br>
      <div className="modalFont2">MY CHARACTER</div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={() =>
          setPageUser((curPageUser) =>
            countUser > 3 && countUser - curPageUser > 3
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
        {userCharacterList &&
          silceImageUser().map((img) => (
            <div className="col-span-1" key={img}>
              <label>
                <input
                  type="radio"
                  className="hidden"
                  value={img}
                  checked={selectedId == img}
                  onChange={handleClickRadioButtonUser}
                />
                <img className="h-60 w-60" alt="sample" src={img} />
              </label>
            </div>
          ))}
      </div>

      {inputImage && (
        <div>
          <label>
            <input
              type="radio"
              className="hidden"
              value={inputImage}
              checked={selectedId == inputImage}
              onChange={handleClickRadioButtonUser}
            />
            <img
              className="w-3/4 h-64"
              id="video"
              src={URL.createObjectURL(inputImage)}
            />
          </label>
        </div>
      )}

      <input
        ref={imageInput}
        className="hidden"
        name="imageUpload"
        type="file"
        onChange={saveImage}
      />

      <span
        className="uploadButton flex justify-center"
        onClick={() => imageInput.current.click()}
      >
        <img src="images\videoupload.png" alt="" className="file" />
      </span>
    </div>
  );
}

export default CharacterImageList;
