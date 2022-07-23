import React, { useState, useEffect } from "react";
import ImageList from "../components/ImageList";
import axios from "axios";
import "./ImageListBlock.css";
import ButtonSession from "./ButtonSession";
//import uuid from "react-uuid";
import { v4 as uuidv4 } from "uuid";

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
  const [isLoding, setIsLoading]: [boolean, any] = useState(false); //api통신 완료 상태 값

  /**
   * @name : Teawon
   * @Function :fetchData - 특정 유저에게 등록된 모든 인물사진들을 가져와 설정하는 함수, 값이 정상적으로 설정되면 isLoading값을 true로 바꾼다
   * @create-data: 2022-07-21
   */
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios
        .get(
          `https://1f413be8-5eb6-428f-a4d4-492745c03b38.mock.pstmn.io/userImage`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
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
                id: uuidv4(), //식별키
                file: null, //버킷에서 가져왔다면 null, 그렇지 않다면 File객체 저장
              };

              imgListBlock.pictures = imgListBlock.pictures.concat(imgData);
            });
            initialData.file = initialData.file.concat(imgListBlock);
          });

          setTotalList(initialData); //가져온 데이터의 가공한 최종 리스트를 totalList에 저장
          setIsLoading(true);
        })
        .catch(function (error) {
          console.log("error");
          console.log(error);
        });
    };
    if (localStorage.getItem("token") == null) {
      fetchData();
    } else {
      setIsLoading(true); //만약 로그인이 되어있지 않다면 api를 보내지 않고 바로 로딩을 완료시킨다.
    }
  }, []);

  /**
   * @name : Teawon
   * @function :makeFormData - 사용자가 입력한 url들을 세션에 저장하고, 만약 파일이 있다면 backend로 보내 버킷에 저장된 Url로 가져와 세션에 이어서 저장한다.
   * @create-data: 2022-07-21
   */

  const makeFormData = () => {
    const formData = new FormData();

    let imageUrlList = []; //AI에 입력될 이미지 url리스트

    totalList.file.forEach((element) => {
      //리스트들의 이름을 키값으로 정의 후 각 이름값을 키값으로 하는 formData를 만든다.
      formData.append("name", element.name);

      element.pictures.forEach((list) => {
        //만약 해당 리스트에 파일이 없고 모두 url이라면 리스트에 저장
        if (list.file == null) {
          imageUrlList.push(list.url); //url
        } else {
          formData.append(element.name, list.file); //file
        }
      });
    });

    let array = formData.getAll("name"); // 특정 이름을 키 값으로하는 데이터가 만약 Null이라면 삭제후 name의 배열값도 수정한다.

    totalList.file.forEach((element) => {
      if (formData.get(element.name) == null) {
        formData.delete(element.name);
        array = array.filter((data) => data !== element.name);
      }
    });

    formData.delete("name");
    array.forEach((nameStr) => {
      formData.append("name", nameStr);
    });

    if (formData.get("name") != null) {
      // 동시에 보낼 파일 내용이 있다면 postApi보낸 후 응답값의 url들을 리스트에 추가
    }

    sessionStorage.setItem("images", JSON.stringify(imageUrlList)); //
    console.log(sessionStorage.getItem("images"));
    // for (let key of formData.keys()) {
    //   console.log("FormData의 key를 확인합니다.");
    //   console.log(key);
    // }

    // // FormData의 value 확인
    // for (let value of formData.values()) {
    //   console.log("FormData의 Values를 확인합니다.");
    //   console.log(value);
    // }
  };

  /**
   * @name : Teawon
   * @function :addImgList - 전체 ImgList의 개수를 늘리는 함수(컴포넌트 수 증가), 처음 이름은 other{count}로 지정하여 컴포넌트를 생성함
   * @create-data: 2022-07-15
   */
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
          {totalList.file && //map을 통해 각 imgList를 출력
            totalList.file.map((imgList) => (
              <ImageList
                key={imgList.name}
                object={imgList}
                changeFuc={changeFuc}
              />
            ))}
          <div className="fixed bottom-0 right-0 p-5">
            <ButtonSession
              img="images/rightArrow.png"
              url="/VideoUpload"
              saveFuc={makeFormData}
            ></ButtonSession>
          </div>
          <div className="fixed bottom-0 left-0 p-5">
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
