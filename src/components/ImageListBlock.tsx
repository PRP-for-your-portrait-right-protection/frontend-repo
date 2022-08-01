import React, { useState, useEffect, useCallback } from "react";
import ImageList from "../components/ImageList";
import axios from "../api/axios";
import "./ImageListBlock.css";
import ButtonSession from "./ButtonSession";
import { HiUserAdd } from "react-icons/hi";
import Load from "../components/Load";
import { useStore } from "../components/store";

/**
 * @name : Teawon
 * @component :ImageListBlock - 각각의 ImgList컴포넌트를 추가하고 전체 데이터를 관리하는 컴포넌트
 * @create-data: 2022-07-15
 */

function ImageListBlock() {
  const { faceId, setFaceId } = useStore(); //zustand 전역변수
  const [count, setCount] = useState<number>(1); //other + n으로 사용하기 위한 url
  const [isLoding, setIsLoading]: [boolean, any] = useState(false); //api통신 완료 상태 값
  const [checkedItems, setCheckedItems] = useState(new Set<string>()); //checkBox확인
  const [checkedList, setCheckedList]: [any, any] = useState([]);
  const [isNobodyNotChecked, setIsNobodyNotChecked] = useState(false);
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

  /**
   * @name : Teawon
   * @Function :fetchData - 특정 유저에게 등록된 모든 인물사진들을 가져와 설정하는 함수, 값이 정상적으로 설정되면 isLoading값을 true로 바꾼다
   * @create-date: 2022-07-21
   * @update-date: 2022-07-27
   * - API연결
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

    /**
     * @name : Teawon
     * @Function :preValueCheck - 기존에 입력된 faceId값이 있다면 해당 값을 check상태로 바꾼다.
     * @create-date: 2022-07-27
     */
    const preValueCheck = () => {
      if (faceId != null) {
        faceId.forEach((face) => {
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
   * @create-date: 2022-07-21
   * @update-date: 2022-07-27
   * - 사용자가 선택한 이미지리스트(faceId)를 세션에 저장
   */
  const makeFormData = () => {
    // setFaceId(Array.from(checkedItems));

    let testDataList = [];
    console.log("여기보세요");
    console.log(totalList);
    checkedItems.forEach((data1) => {
      console.log("------");
      console.log(totalList.data.whitelistFaceId);
      console.log(data1);
      console.log("------");
      totalList.data.forEach((inner) => {
        if (inner.whitelistFaceId === data1) {
          let temp = {
            id: inner.whitelistFaceId,
            url: inner.whitelistFaceImages[0].url,
            name: inner.whitelistFaceName,
            count: inner.whitelistFaceImages.length,
          };
          testDataList.push(temp);
        }
      });

      console.log("최종으로 저장될 썸네일 , 개수 등등~");
      console.log(testDataList);
      setFaceId(testDataList);
    });
  };

  /**
   * @name : Teawon
   * @function :addImgList - 전체 ImgList의 개수를 늘리는 함수(컴포넌트 수 증가), 처음 이름은 other{count}로 지정하여 컴포넌트를 생성함
   * @create-date: 2022-07-15
   * @update-date: 2022-07-27
   * -api 및 구조 변경
   */
  const addImgList = (filename) => {
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
        console.log(error);
      });
    setCount((count) => count + 1);
    window.scrollTo(0, document.body.scrollHeight);
  };

  /**
   * @name : Teawon
   * @function :changeFuc - 특정 이미지추가, 이미지 삭제 및 전체ImgList의 삭제 함수
   * 부모컴포넌트인 ImageListBlock의 상태값 갱신 함수를 통해 전체 상태값의 변화를 관리합니다.
   * @param :
   *  object(any) - 삭제id 값 혹은 추가될 이미지 리스트 등의 Data객체
   *  name - 해당 ImgList를 식별하는 name값
   *  type - 이미지 삭체, 이미지리스트삭제, 추가 등 실행할 함수의 타입
   * @create-date: 2022-07-15
   * @update-date: 2022-07-22
   * -api구조 변경에 따른 변경 및 axios설계
   */

  const changeFuc = (object, whitelistFace, type) => {
    console.log("전체 값");
    console.log(totalList);
    const formData = new FormData();
    let findIndex = totalList.data.findIndex(
      (element) => element.whitelistFaceId == whitelistFace.whitelistFaceId
    );

    let copyArray = { ...totalList };

    //함수의 입력값에 따라 상태값 변경함수 실행 및 api호출
    switch (type) {
      case "add": //특정 faceList중 하나의 이미지 추가
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
            object.id = response.data.id;
          })
          .catch(function (error) {
            console.log(error);
            object.id = -1;
          });

        delete object["file"];

        copyArray.data[findIndex].whitelistFaceImages = [
          ...copyArray.data[findIndex].whitelistFaceImages,
          object,
        ];
        setTotalList(copyArray);
        break;

      case "deleteImg": //특정 이미지 리스트 중 하나의 이미지 삭제
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
            console.log(error);
          });

        copyArray.data[findIndex].whitelistFaceImages = copyArray.data[
          findIndex
        ].whitelistFaceImages.filter((img) => img.id !== object);
        setTotalList(copyArray);
        break;

      case "deleteList": //특정 faceList 삭제
        copyArray.data = copyArray.data.filter(
          (list) => list.whitelistFaceId !== whitelistFace.whitelistFaceId
        );
        setTotalList(copyArray);
        checkedItemHandler(whitelistFace.whitelistFaceId, false); //삭제된 리스트의 checkBox값 해제

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

      case "reName": //특정 faceList의 이름을 변경
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

  /**
   * @name : Teawon
   * @function :checkedItemHandler - 각 이미지리스트의 체크값 상태 변화 함수
   * 부모컴포넌트인 ImageListBlock의 상태값 갱신 함수를 통해 전체 상태값의 변화를 관리합니다.
   * @param :
   *  id- 삭제할 이미지 id
   *  isChecked - 체크 여부
   * @create-date: 2022-07-27
   */
  const checkedItemHandler = (id, isChecked) => {
    if (isChecked) {
      checkedItems.add(id);
      setCheckedItems(checkedItems);
      setIsNobodyNotChecked(false);
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id);
      setCheckedItems(checkedItems);
    }
    console.log(checkedItems);
  };

  const onCheckedAll = (checked) => {
    if (checked) {
      checkedItems.clear();
      setCheckedItems(checkedItems);
      setIsNobodyNotChecked(true);
    }
    console.log(checkedItems);
  };

  return (
    <>
      {isLoding ? (
        <>
          <div className="wrapImage2">
            <ol className="box2">
              <ul className="pictureList2">
                <li className="flex items-center float-left">
                  <div className="checkbox2">
                    <input
                      type="checkbox"
                      name="check"
                      id="check"
                      value="1"
                      className="checkbox2"
                      checked={isNobodyNotChecked}
                      onChange={(e) => onCheckedAll(e.target.checked)}
                    />
                  </div>
                </li>
                <li className="personName2">
                  <div className="pl-5">NOBODY</div>
                  <div className="info">
                    : Please check if you want to blur everything out
                  </div>
                </li>
              </ul>
            </ol>
          </div>
          {totalList.data && //map을 통해 각 imgList를 출력
            totalList.data.map((imgList) => (
              <ImageList
                key={imgList.whitelistFaceId}
                object={imgList}
                changeFuc={changeFuc}
                checkFuc={checkedItemHandler}
                checked={checkedItems.has(imgList.whitelistFaceId)}
                isNobodyNotChecked={isNobodyNotChecked}
              />
            ))}
          <div className="addBox">
            <button //ImgList추가 버튼
              className="addBtn"
              onClick={() => addImgList(null)}
            >
              <HiUserAdd
                size="3.5vw"
                justify-content="center"
                place-content="center"
              />
              <p className="fontBox">Plus Person</p>
            </button>
          </div>
          <div className="fixed bottom-0 right-0 p-5">
            <ButtonSession
              img="images/right.png"
              url="/VideoUpload"
              text="next"
              saveFuc={makeFormData}
            ></ButtonSession>
          </div>
          <div className="fixed bottom-0 left-0 p-5">
            <ButtonSession
              img="images/left.png"
              url="/"
              text="previous"
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
