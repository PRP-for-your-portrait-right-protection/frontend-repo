import React, { useRef, useState } from "react";
import "./ImageList.css";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";
/**
 * @name : Teawon
 * @component :ImageList - name , picture리스트를 통해 특정 유저에 대한 사진리스트를 관리하는 컴포넌트
 * @create-data: 2022-07-15
 */

interface ImageListProps {
  object: any;
}

function ResultImageList({ object }: ImageListProps) {
  const count: number = object.length; //해당 컴포넌트가 가지고있는 list개수
  const [curPage, setPage]: [number, any] = useState<number>(0); //curPage를 기점으로 curPage~curPage3까지의 요소만 보여줌

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

  return (
    <div className="wrapImage pt-14">
      <ul className="pictureList">
        <li>
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
        </li>
        <li className="g grid grid-cols-4 gap-4">
          {object &&
            silceImage(object).map((img) => (
              <div key={img.id} className="col-span-1 relative justify-center">
                <img className="h-36 w-36 z-10" alt="sample" src={img.url} />
                <p className="text-base justify-center">NAME : {img.name}</p>
                <p className="text-base">COUNT : {img.count}</p>
              </div>
            ))}
        </li>
        <li>
          <button
            className="show flex items-center justify-center"
            onClick={() =>
              setPage((curPage) =>
                count > 3 && count - curPage > 3 ? curPage + 1 : curPage
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
        </li>
      </ul>
    </div>
  );
}

export default ResultImageList;
