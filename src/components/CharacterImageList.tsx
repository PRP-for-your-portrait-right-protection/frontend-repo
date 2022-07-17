import React, { useState } from "react";
import "./CharacterImageList.css";
/**
 * @name : Teawon
 * @component :ImageList - name , picture리스트를 통해 특정 유저에 대한 사진리스트를 관리하는 컴포넌트
 * @create-data: 2022-07-15
 */

interface ImageListProps {
  characterList: any;
  clickFuc: any;
}

function CharacterImageList({ characterList, clickFuc }: ImageListProps) {
  const [count, setCount]: [number, any] = useState<number>(
    characterList.length
  ); //해당 컴포넌트가 가지고있는 list개수

  const [selectedId, setSeselectedId] = useState<number>(0); //선택된 이미지 id

  const handleClickRadioButton = (e) => {
    setSeselectedId(e.target.value);
    clickFuc(characterList[e.target.value].url);
  };

  const [curPage, setPage]: [number, any] = useState<number>(0); //curPage를 기점으로 curPage~curPage3까지의 요소만 보여줌

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

  return (
    <div className="imageList-component mt-28">
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
            <div className="col-span-1" key={img.id}>
              <label>
                <input
                  type="radio"
                  className="hidden"
                  value={img.id}
                  checked={selectedId == img.id}
                  onChange={handleClickRadioButton}
                />
                <img className="h-60 w-60" alt="sample" src={img.url} />
              </label>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CharacterImageList;
