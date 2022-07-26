import React, { useState, useEffect } from "react";
import ImageList from "../components/ImageList";
import axios from "axios";
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
      let data = [
        {
          whitelistFaceId: "id1",
          whitelistFaceName: "you",
          whitelistFaceImages: [
            {
              id: "img1",
              url: "https://image.dongascience.com/Photo/2019/05/15568758367729.jpg",
            },
            {
              id: "img2",
              url: "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/10/00/a1000408/img/basic/a1000408_main.jpg?20210428225326&q=80&rw=750&rh=536",
            },
          ],
        },
        {
          whitelistFaceId: "id",
          whitelistFaceName: "other",
          whitelistFaceImages: [
            {
              id: "img3",
              url: "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/10/00/a1000408/img/basic/a1000408_main.jpg?20210428225326&q=80&rw=750&rh=536",
            },
            {
              id: "img4",
              url: "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/10/00/a1000408/img/basic/a1000408_main.jpg?20210428225326&q=80&rw=750&rh=536",
            },
          ],
        },
      ];

      let initialData = {
        //초기 설정 값
        data: [],
      };

      data.forEach((imgList) => {
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
    };

    //   const result = await axios
    //     .get(
    //       `https://1f413be8-5eb6-428f-a4d4-492745c03b38.mock.pstmn.io/userImage`,
    //       {
    //         headers: {
    //           Authorization: "Bearer " + localStorage.getItem("token"),
    //         },
    //       }
    //     )
    //     .then(function (response) {
    //       console.log(response);
    //       let initialData = {
    //         //초기 설정 값
    //         file: [],
    //       };

    //       response.data.data.forEach((imgList) => {
    //         //바깥 반복문의 리스트 및 이름 정의
    //         let imgListBlock = {
    //           name: imgList.name,
    //           pictures: [],
    //         };

    //         imgList.pictures.forEach((image) => {
    //           //내부 이미지 리스트의 각 내용 정의
    //           let imgData = {
    //             url: image.pictureUrl,
    //             id: uuid(), //식별키
    //             file: null, //버킷에서 가져왔다면 null, 그렇지 않다면 File객체 저장
    //           };

    //           imgListBlock.pictures = imgListBlock.pictures.concat(imgData);
    //         });
    //         initialData.file = initialData.file.concat(imgListBlock);
    //       });

    //       setTotalList(initialData); //가져온 데이터의 가공한 최종 리스트를 totalList에 저장
    //       setIsLoading(true);
    //     })
    //     .catch(function (error) {
    //       console.log("error");
    //       console.log(error);
    //     });
    // };

    fetchData();
  }, []);

  /**
   * @name : Teawon
   * @function :makeFormData - 사용자가 입력한 url들을 세션에 저장하고, 만약 파일이 있다면 backend로 보내 버킷에 저장된 Url로 가져와 세션에 이어서 저장한다.
   * @create-data: 2022-07-21
   */

  const makeFormData = () => {
    const formData = new FormData();

    if (checkedItems != null) {
      Array.from(checkedItems).forEach((faceId) => {
        formData.append("faceId", faceId);
      });
    }
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

    // axios를 통해 해당 strName을 보낸 후 , return값의 ID를 해당 id값으로 등록

    setTotalList({
      data: [
        ...totalList.data,
        {
          whitelistFaceName: strName,
          whitelistFaceId: "axiosId",
          whitelistFaceImages: [],
        },
      ],
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
        //axio(object.file값 넘기고 return 받아서 object.id값에 덮어씌우기)

        object.id = "axiosId";
        delete object["file"];

        copyArray.data[findIndex].whitelistFaceImages = [
          ...copyArray.data[findIndex].whitelistFaceImages,
          object,
        ];
        setTotalList(copyArray);
        break;
      case "deleteImg":
        copyArray.data[findIndex].whitelistFaceImages = copyArray.data[
          findIndex
        ].whitelistFaceImages.filter((img) => img.id !== object);
        setTotalList(copyArray);
        //axios로 해당 imgID값을 지운다고 post보내기.
        break;
      case "deleteList":
        copyArray.data = copyArray.data.filter(
          (list) => list.whitelistFaceName !== whitelistFace.whitelistFaceName
        );
        setTotalList(copyArray);
        //axios로 delete아이디 값 보내기
        checkedItemHandler(whitelistFace.whitelistFaceId, false);
        break;
      case "reName":
        //object.whitelistFaceId 값과 data.white...값을 post로 보내기
        copyArray.data.map((data) => {
          if (data.whitelistFaceName === whitelistFace.whitelistFaccName) {
            data.whitelistFaceName = object.whitelistFaccName;
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
