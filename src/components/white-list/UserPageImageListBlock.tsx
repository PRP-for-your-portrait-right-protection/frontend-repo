import React, { useState, useEffect } from "react";
import UserPageImageList from "./UserPageImageList";
import axios from "../../api/axios";
import "./ImageListBlock.css";
import { HiUserAdd } from "react-icons/hi";
import Load from "../Load";
//import Pagination from "../components/Pagination";
import Pagination from "react-js-pagination";
import "../Paging.css";
import { whiteFaceImageListsDto } from "../../utils/types";
/**
 * @name : Teawon
 * @component :ImageListBlock - 각각의 ImgList컴포넌트를 추가하고 전체 데이터를 관리하는 컴포넌트
 * @create-data: 2022-07-15
 */

function UserPageImageListBlock() {
  const [count, setCount] = useState<number>(1); //other + n으로 사용하기 위한 url
  const [isLoding, setIsLoading] = useState<boolean>(false); //api통신 완료 상태 값
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [characterPerPage, setCharacterPerPage] = useState<number>(3); //페이지당 원하는개수
  const indexOfLastVideo = currentPage * characterPerPage;
  const indexOfFirstVideo = indexOfLastVideo - characterPerPage;

  const [totalList, setTotalList] = useState<whiteFaceImageListsDto[]>([
    {
      //최종적으로 backend로 보내질 데이터 리스트 집합
      whitelistFaceId: "id",
      whitelistFaceName: "you",
      whitelistFaceImages: [],
    },
  ]);

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
            token: JSON.parse(localStorage.getItem("token")).value,
          },
        })
        .then(function (response) {
          let initialData = [];
          //초기 설정 값
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
            initialData = initialData.concat(imgListBlock);
          });
          setTotalList(initialData); //가져온 데이터의 가공한 최종 리스트를 totalList에 저장
          setIsLoading(true);
          setCount(totalList.length);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    /**
     * @name : Teawon
     * @Function :preValueCheck - 기존에 입력된 faceId값이 있다면 해당 값을 check상태로 바꾼다.
     * @create-date: 2022-07-27
     */

    fetchData();
  }, []);

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
          token: JSON.parse(localStorage.getItem("token")).value,
        },
      })
      .then(function (response) {
        setTotalList([
          ...totalList,
          {
            whitelistFaceName: strName,
            whitelistFaceId: response.data.id,
            whitelistFaceImages: [],
          },
        ]);
        window.scrollTo(0, document.body.scrollHeight);
      })
      .catch(function (error) {
        console.log(error);
      });
    setCount((count) => count + 1);
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
    const formData = new FormData();
    let findIndex = totalList.findIndex(
      (element) => element.whitelistFaceId == whitelistFace.whitelistFaceId
    );

    let copyArray = [...totalList];

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
                token: JSON.parse(localStorage.getItem("token")).value,
              },
            }
          )
          .then(function (response) {
            object.id = response.data.id;
          })
          .catch(function (error) {
            console.log(error);
            object.id = "error";
          });

        delete object["file"];

        copyArray[findIndex].whitelistFaceImages = [
          ...copyArray[findIndex].whitelistFaceImages,
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
                token: JSON.parse(localStorage.getItem("token")).value,
              },
            }
          )
          .then(function (response) {})
          .catch(function (error) {
            console.log(error);
          });

        copyArray[findIndex].whitelistFaceImages = copyArray[
          findIndex
        ].whitelistFaceImages.filter((img) => img.id !== object);
        setTotalList(copyArray);
        break;

      case "deleteList": //특정 faceList 삭제
        copyArray = copyArray.filter(
          (list) => list.whitelistFaceId !== whitelistFace.whitelistFaceId
        );
        if (
          (totalList.length - 1) % characterPerPage == 0 &&
          currentPage != 1
        ) {
          //페이지 삭제 예외처리
          setCurrentPage((currentPage) => currentPage - 1);
        }
        setTotalList(copyArray);

        axios
          .delete(`/whitelist-faces/${whitelistFace.whitelistFaceId}`, {
            headers: {
              token: JSON.parse(localStorage.getItem("token")).value,
            },
          })
          .then(function (response) {})
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
                token: JSON.parse(localStorage.getItem("token")).value,
              },
            }
          )
          .then(function (response) {})
          .catch(function (error) {
            console.log(error);
          });

        copyArray.map((data) => {
          if (data.whitelistFaceName === whitelistFace.whitelistFaceName) {
            data.whitelistFaceName = object;
          }
        });

        setTotalList(copyArray);
    }
  };

  const currentImageList = (characterImg) => {
    return characterImg.slice(indexOfFirstVideo, indexOfLastVideo);
  };

  return (
    <>
      {isLoding ? (
        <>
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
          {totalList && //map을 통해 각 imgList를 출력
            currentImageList(totalList).map((imgList) => (
              <UserPageImageList
                key={imgList.whitelistFaceId}
                whiteFaceImageLists={imgList}
                changeFuc={changeFuc}
              />
            ))}
          {totalList.length != 0 ? (
            <Pagination
              itemsCountPerPage={characterPerPage}
              totalItemsCount={totalList.length}
              onChange={setCurrentPage}
              activePage={currentPage}
              pageRangeDisplayed={5}
              prevPageText={"‹"}
              nextPageText={"›"}
            />
          ) : (
            <div className="noContent">No content</div>
          )}
        </>
      ) : (
        <Load />
      )}
    </>
  );
}
export default UserPageImageListBlock;
