import React, { useState, useEffect } from "react";
import ImageList from "../components/ImageList";
import axios from "../api/axios";
import "./ImageListBlock.css";
import ButtonSession from "./ButtonSession";
import { HiUserAdd } from "react-icons/hi";
import Load from "components/Load";

/**
 * @name : Teawon
 * @component :ImageListBlock - 각각의 ImgList컴포넌트를 추가하고 전체 데이터를 관리하는 컴포넌트
 * @create-data: 2022-07-15
 */

function ImageListBlock() {
  const [count, setCount] = useState<number>(1); //other + n으로 사용하기 위한 url
  const [totalList, setTotalList]: [any, any] = useState({
    //최종적으로 backend로 보내질 데이터 리스트 집합
    data: [
      {
        whitelistFaceId: "id",
        whitelistFaceName: "you",
        pictures: [],
      },
    ],
  });
  const [isLoding, setIsLoading]: [boolean, any] = useState(false); //api통신 완료 상태 값
  const [checkedItems, setCheckedItems] = useState(new Set<string>());

  /**
   * @name : Teawon
   * @Function :fetchData - 특정 유저에게 등록된 모든 인물사진들을 가져와 설정하는 함수, 값이 정상적으로 설정되면 isLoading값을 true로 바꾼다
   * @create-data: 2022-07-21
   */
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios
        .get(`/whitelist-faces/images`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then(function (response) {
          console.log(response);
          let initialData = {
            //초기 설정 값
            data: [],
          };

          response.data.data.forEach((imgList) => {
            console.log("errr");
            console.log(imgList);
            //바깥 반복문의 리스트 및 이름 정의
            let imgListBlock = {
              whitelistFaceName: imgList.whitelistFaceName,
              whitelistFaceId: imgList.whitelistFaceId,
              whitelistFaceImages: [],
            };

            imgList.whitelistFaceImages.forEach((image) => {
              //내부 이미지 리스트의 각 내용 정의
              let imgData = {
                url: image.url,
                id: image.id,
              };

              imgListBlock.whitelistFaceImages =
                imgListBlock.whitelistFaceImages.concat(imgData);
            });
            initialData.data = initialData.data.concat(imgListBlock);
          });
          setTotalList(initialData); //가져온 데이터의 가공한 최종 리스트를 totalList에 저장

          setIsLoading(true);
        })
        .catch(function (error) {
          console.log("error");
          console.log(error);
        });
    };

    const preValueCheck = () => {
      console.log("이전 값 함수 호출");
      if (sessionStorage.getItem("faceId") != null) {
        console.log("이전 값이 있어요.");
        JSON.parse(sessionStorage.getItem("faceId")).forEach((face) => {
          console.log("이전값:");
          console.log(face);
          checkedItemHandler(face, true);
        });
      }
    };

    fetchData();
    preValueCheck();
  }, []);

  /**
   * @name : Teawon
   * @function :makeFormData - 사용자가 입력한 url들을 세션에 저장하고, 만약 파일이 있다면 backend로 보내 버킷에 저장된 Url로 가져와 세션에 이어서 저장한다.
   * @create-data: 2022-07-21
   */

  const makeFormData = () => {
    // const formData = new FormData();

    // console.log(checkedItems == null);
    // console.log(checkedItems.size);

    sessionStorage.setItem("faceId", JSON.stringify(Array.from(checkedItems)));
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
    const formData = new FormData();
    formData.append("name", strName);
    // axios를 통해 해당 strName을 보낸 후 , return값의 ID를 해당 id값으로 등록
    axios
      .post(`/whitelist-faces`, formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then(function (response) {
        console.log(response);
        setTotalList({
          data: [
            ...totalList.data,
            {
              whitelistFaceName: strName,
              whitelistFaceId: response.data.id,
              whitelistFaceImages: [],
            },
          ],
        });
      })
      .catch(function (error) {
        console.log("error");
        console.log(error);
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

  const changeFuc = (object, whitelistFace, type) => {
    const formData = new FormData();
    console.log("totalList?");
    console.log(totalList);
    let findIndex = totalList.data.findIndex(
      (element) => element.whitelistFaceName == whitelistFace.whitelistFaceName
    );
    console.log(object);
    console.log("index? : ");
    console.log(findIndex);
    let copyArray = { ...totalList };

    console.log("changeFuc의 copyArray값 :");
    console.log(copyArray);

    switch (type) {
      case "add":
        console.log(object);
        //axio(object.file값 넘기고 return 받아서 object.id값에 덮어씌우기)
        formData.append("file", object.file);
        axios
          .post(
            `/whitelist-faces/${whitelistFace.whitelistFaceId}/images`,
            formData,
            {
              headers: {
                token: localStorage.getItem("token"),
              },
            }
          )
          .then(function (response) {
            console.log(response);
            object.id = response.data.id;
          })
          .catch(function (error) {
            console.log("error");
            console.log(error);
            object.id = 0;
          });

        delete object["file"];
        console.log("여기왔어요???");
        copyArray.data[findIndex].whitelistFaceImages = [
          ...copyArray.data[findIndex].whitelistFaceImages,
          object,
        ];
        setTotalList(copyArray);
        break;
      case "deleteImg":
        axios
          .delete(
            `/whitelist-faces/${whitelistFace.whitelistFaceId}/images/${object}`,
            {
              headers: {
                token: localStorage.getItem("token"),
              },
            }
          )
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log("error");
            console.log(error);
            object.id = 0;
          });
        copyArray.data[findIndex].whitelistFaceImages = copyArray.data[
          findIndex
        ].whitelistFaceImages.filter((img) => img.id !== object);
        setTotalList(copyArray);
        //axios로 해당 imgID값을 지운다고 post보내기.
        break;
      case "deleteList":
        copyArray.data = copyArray.data.filter(
          (list) => list.whitelistFaceId !== whitelistFace.whitelistFaceId
        );
        setTotalList(copyArray);
        checkedItemHandler(whitelistFace.whitelistFaceId, false);

        axios
          .delete(`/whitelist-faces/${whitelistFace.whitelistFaceId}`, {
            headers: {
              token: localStorage.getItem("token"),
            },
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        break;
      case "reName":
        //object.whitelistFaceId 값과 data.white...값을 post로 보내기
        console.log("asd");
        console.log(object);
        formData.append("face_name_after", object);
        axios
          .patch(
            `/whitelist-faces/${whitelistFace.whitelistFaceId}`,
            formData,
            {
              headers: {
                token: localStorage.getItem("token"),
              },
            }
          )
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        copyArray.data.map((data) => {
          if (data.whitelistFaceName === whitelistFace.whitelistFaceName) {
            data.whitelistFaceName = object;
          }
        });

        setTotalList(copyArray);
    }
  };

  const checkedItemHandler = (id, isChecked) => {
    if (isChecked) {
      checkedItems.add(id);
      setCheckedItems(checkedItems);
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id);
      setCheckedItems(checkedItems);
    }
    console.log("체크값");
    console.log(checkedItems);
    console.log(totalList);
  };

  return (
    <>
      {isLoding ? (
        <>
          <button //ImgList추가 버튼
            className="addBtn"
            onClick={() => addImgList(null)}
          >
            <HiUserAdd
              size="50"
              flex-direction="row"
              justify-content="center"
              place-content="center"
            />
          </button>
          {totalList.data && //map을 통해 각 imgList를 출력
            totalList.data.map((imgList) => (
              <ImageList
                key={imgList.whitelistFaceId}
                object={imgList}
                changeFuc={changeFuc}
                checkFuc={checkedItemHandler}
                checked={checkedItems.has(imgList.whitelistFaceId)}
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
        <Load />
      )}
    </>
  );
}
export default ImageListBlock;
