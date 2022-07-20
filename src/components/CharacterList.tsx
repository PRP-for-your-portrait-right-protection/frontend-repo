import React, { useRef, useState } from "react";
import "./CharacterList.css";
import CharacterBlock from "components/CharacterBlock";

/**
 * @name : Teawon
 * @component :CharacterList - name , character리스트를 통해 특정 유저에 대한 사진리스트를 관리하는 컴포넌트
 * @create-data: 2022-07-15
 */

interface CharacterListProps {
  object: any;
  changeFuc: any;
}

function CharacterList({ object, changeFuc }: CharacterListProps) {
  const characterInput = useRef<any>();
  const characterList = useState(object);
  const [count, setCount]: [number, any] = useState<number>(0); //해당 컴포넌트가 가지고있는 list개수
  const [curPage, setPage]: [number, any] = useState<number>(0); //curPage를 기점으로 curPage~curPage3까지의 요소만 보여줌

  /**
   * @name : Teawon
   * @function :saveFileCharacterNew - 캐릭터 사진을 입력받아 리스트에 저장하는 함수
   * @create-data: 2022-07-20
   */
  const saveFileCharacterNew = (event: React.ChangeEvent<HTMLInputElement>) => {
    let data = {
      url: URL.createObjectURL(event.target.files[0]),
      id: count,
      file: event.target.files[0],
      new: "Y",
    };

    changeFuc(data, object.name, "add");
    setCount((count) => count + 1);
  };

  /**
   * @name : Teawon
   * @function :deleteFileCharacter - 특정 캐릭터를 지우는 함수 (부모의 상태값 갱신함수 changeFuc 호출)
   * @param :
   * id - 특정 캐릭터의 id값 (식별용)
   * @create-data: 2022-07-20
   */
  const deleteFileCharacter = (id) => {
    changeFuc(id, object.name, "deleteCharacter");
    if (curPage > 0) {
      setPage((curPage) => curPage - 1);
    }
  };

  /**
   * @name : Teawon
   * @function :silceCharacter - 해당 리스트컴포넌트에서 총 3개의 이미지만 보여주도록 slice하는 함수
   * @param :
   * CharacterList - 캐릭터 이미지 리스트
   */
  const silceCharacter = (characterList) => {
    let currentPosts = [];
    currentPosts = characterList[0].pictures.slice(curPage, curPage + 7);
    console.log(curPage);
    return currentPosts;
  };

  return (
    <div className="characterList">
      {/*  <button
        className="showNext"
        onClick={() =>
          setPage((curPage) =>
            count > 3 && count - curPage > 3 ? curPage + 1 : curPage
          )
        }
      ></button>
      <button
        className="showPre"
        onClick={() =>
          setPage((curPage) => (curPage > 0 ? curPage - 1 : curPage))
        }
      ></button>
 */}
      <div className="grid grid-cols-4 grid-rows-2 gap-x-4 gap-y-10 mx-96">
        <span
          className="col-span-1 uploadButton flex justify-center"
          onClick={() => characterInput.current.click()}
        >
          <img src="images\addImage.png" alt="" className="h-36 w-36" />
        </span>

        {characterList &&
          silceCharacter(characterList).map((img) => (
            <CharacterBlock
              key={img.id}
              object={img}
              deleteFileCharacter={deleteFileCharacter}
            />
          ))}
      </div>

      <div>
        <input
          ref={characterInput}
          id={object.name}
          className="hidden"
          name="characterUpload"
          type="file"
          accept="image/*"
          onChange={saveFileCharacterNew}
        />
      </div>
    </div>
  );
}

export default CharacterList;
