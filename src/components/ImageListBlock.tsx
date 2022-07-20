import React, { useState, useEffect } from "react";
import ImageList from "../components/ImageList";
//import axios from "axios";
import "./ImageListBlock.css";
import ButtonSession from "./ButtonSession";
import uuid from "react-uuid";

/**
 * @name : Teawon
 * @component :ImageListBlock - 각각의 ImgList컴포넌트를 추가하고 전체 데이터를 관리하는 컴포넌트
 * @create-data: 2022-07-15
 */

function ImageListBlock() {
  const [count, setCount] = useState<number>(1); //other + n으로 사용하기 위한 url
  const [totalList, setTotalList]: [any, any] = useState({
    //최종적으로 backend로 보내질 데이터 리스트 집합
    file: [
      {
        name: "you",
        pictures: [],
      },
    ],
  });
  const [isLoding, setIsLoading]: [boolean, any] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://1f413be8-5eb6-428f-a4d4-492745c03b38.mock.pstmn.io/userImage`
      )
        .then(function (response) {
          let initialData = {
            //초기 설정 값
            file: [],
          };

          response.data.data.forEach((imgList) => {
            //바깥 반복문의 리스트 및 이름 정의
            let imgListBlock = {
              name: imgList.name,
              pictures: [],
            };

            imgList.pictures.forEach((image) => {
              //내부 이미지 리스트의 각 내용 정의
              let imgData = {
                url: image,
                id: uuid(), //식별키
                file: null, //버킷에서 가져왔다면 null, 그렇지 않다면 File객체 저장
              };

              imgListBlock.pictures = imgListBlock.pictures.concat(imgData);
            });
            initialData.file = initialData.file.concat(imgListBlock);
          });

          setTotalList(initialData);
          setIsLoading(true);
        })
        .catch(function (error) {
          console.log("error");
          console.log(error);
        });
    };
    fetchData();
  }, []);

  /**
   * @name : Teawon
   * @function :addImgList - 전체 ImgList의 개수를 늘리는 함수(컴포넌트 수 증가), 처음 이름은 other{count}로 지정하여 컴포넌트를 생성함
   * @create-data: 2022-07-15
   */

  const makeFormData = () => {
    // const formData = new FormData();
    // const imageList = totalList.file;

    // totalList.file.forEach((element) => {
    //   formData.append("name", element.name);
    //   element.pictures.forEach((list) => {
    //     formData.append("file", list.file);
    //   });
    // });

    // for (let key of formData.keys()) {
    //   console.log("FormData의 key를 확인합니다.");
    //   console.log(key);
    // }

    // // FormData의 value 확인
    // for (let value of formData.values()) {
    //   console.log("FormData의 Values를 확인합니다.");
    //   console.log(value);
    // }

    //  sessionStorage.removeItem("key");
    console.log(totalList);
    sessionStorage.setItem("key", JSON.stringify(totalList));
    console.log(sessionStorage.getItem("key"));
  };

  const addImgList = (filename) => {
    window.scrollTo(0, document.body.scrollHeight);
    let strName = filename;
    if (filename == null) {
      strName = "other".concat(String(count));
    }

    setTotalList({
      file: [...totalList.file, { name: strName, pictures: [] }],
    });

    setCount((count) => count + 1);

    console.log("생성되었습니다. 생성된 파일은 다음과 같아요.");

    console.log(totalList);
  };

  /**
   * @name : Teawon
   * @function :changeFuc - 특정 이미지추가, 이미지 삭제 및 전체ImgList의 삭제 함수
   * 부모컴포넌트인 ImageListBlock의 상태값 갱신 함수를 통해 전체 상태값의 변화를 관리합니다.
   * @param :
   *  object(any) - 삭제id 값 혹은 추가될 이미지 리스트 등의 Data객체
   *  name - 해당 ImgList를 식별하는 name값
   *  type - 이미지 삭체, 이미지리스트삭제, 추가 등 실행할 함수의 타입
   * @create-data: 2022-07-15
   */

  const changeFuc = (object, name, type) => {
    let findIndex = totalList.file.findIndex((element) => element.name == name);
    let copyArray = { ...totalList };

    console.log("changeFuc의 copyArray값 :");
    console.log(copyArray);

    switch (type) {
      case "add":
        copyArray.file[findIndex].pictures = [
          ...copyArray.file[findIndex].pictures,
          object,
        ];
        setTotalList(copyArray);
        break;
      case "deleteImg":
        copyArray.file[findIndex].pictures = copyArray.file[
          findIndex
        ].pictures.filter((img) => img.id !== object);
        setTotalList(copyArray);
        break;
      case "deleteList":
        copyArray.file = copyArray.file.filter((list) => list.name !== name);
        setTotalList(copyArray);
        break;
      case "reName":
        copyArray.file.map((data) => {
          if (data.name === name) {
            data.name = object;
          }
        });

        setTotalList(copyArray);
    }
  };

  return (
    <>
      {isLoding ? (
        <>
          <button //ImgList추가 버튼
            className="addBtn"
            onClick={() => addImgList(null)}
          >
            ADD
          </button>
          <button //ImgList추가 버튼
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => makeFormData()}
          >
            Make
          </button>
          {totalList.file && //map을 통해 각 imgList를 출력
            totalList.file.map((imgList) => (
              <ImageList
                key={imgList.name}
                object={imgList}
                changeFuc={changeFuc}
              />
            ))}
          <div className="absolute bottom-0 right-0 p-5">
            <ButtonSession
              img="images/rightArrow.png"
              url="/VideoUpload"
              saveFuc={makeFormData}
            ></ButtonSession>
          </div>
          <div className="absolute bottom-0 left-0 p-5">
            <ButtonSession
              img="images/leftArrow.png"
              url="/"
              saveFuc={null}
            ></ButtonSession>
          </div>
        </>
      ) : (
        "Loading" //향후 민지님께서 만드신 Component 사용해야함
      )}
    </>
  );
}
export default ImageListBlock;
