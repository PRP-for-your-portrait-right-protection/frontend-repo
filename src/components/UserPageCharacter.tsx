import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

import styled from "styled-components";
import UserPageCharacterImageList from "components/UserPageCharacterImageList";
function UserPageCharacter() {
  const [userCharacterList, setUserCharacterList] = useState([]); // 사용자 캐릭터 이미지

  /**
   * @name : Teawon
   * @function :useEffect - 캐릭터의 사진 및 사용자 캐릭터를 가져와 리스트에 설정
   * 만약 세션에 이전에 선택했던 정보가 들어있다면 selectedData에 값을 설정하여 복구
   * @create-data: 2022-07-22
   *
   */
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const resultFix = await axios
  //       .get(
  //         `https://9bac662b-822f-45f7-854a-1d5ff7069263.mock.pstmn.io/fixCharacter`,
  //         {
  //           headers: {
  //             Authorization: "Bearer " + localStorage.getItem("token"),
  //           },
  //         }
  //       )
  //       .then(function (response) {
  //         console.log(response);
  //         setCharacterList(response.data.faceImageUrls);
  //         console.log(characterList);
  //       })
  //       .catch(function (error) {
  //         console.log("error");
  //         console.log(error);
  //       });

  //     const resultUser = await axios
  //       .get(
  //         `https://9bac662b-822f-45f7-854a-1d5ff7069263.mock.pstmn.io/userCharacter`,
  //         {
  //           headers: {
  //             Authorization: "Bearer " + localStorage.getItem("token"),
  //           },
  //         }
  //       )
  //       .then(function (response) {
  //         let personalCharacterList = [];
  //         response.data.data.forEach((personalUrl) => {
  //           personalCharacterList.push(personalUrl.url);
  //         });
  //         console.log(response);
  //         setUserCharacterList(personalCharacterList);
  //         console.log(userCharacterList);
  //       })
  //       .catch(function (error) {
  //         console.log("error");
  //         console.log(error);
  //       });
  //   };

  //   fetchData();

  //   const preValue = sessionStorage.getItem("character");
  //   if (preValue != null) {
  //     setSelectedData(preValue);
  //     if (preValue === "M") {
  //       clickedToggleM();
  //     } else {
  //       clickedToggleC();
  //     }
  //   }
  // }, []);

  useEffect(() => {
    const data2 = [
      {
        id: "user3",
        url: "https://i.pinimg.com/originals/11/bc/3d/11bc3dd3e0f0e369e9b4613ece97fba8.gif",
      },
      {
        id: "user4",
        url: "https://i.pinimg.com/originals/11/bc/3d/11bc3dd3e0f0e369e9b4613ece97fba8.gif",
      },
    ];

    setUserCharacterList(data2);
  }, []);

  const deleteImgList = (imgId) => {
    console.log("지웁니다.");
    console.log(userCharacterList);
    //axios로 delete함수 호출해서 부르기

    setUserCharacterList(
      userCharacterList.filter((characterImg) => characterImg.id !== imgId)
    );
    console.log(userCharacterList);
  };

  const addImgList = (insertData) => {
    console.log(userCharacterList);
    //axios insertData(file객체)보낸 후, 데이터를 받아서 아래 리스트에 추가
    let tempAxiosData = {
      id: "newAxiosID2",
      url: "https://cdn.pixabay.com/photo/2022/01/11/21/48/link-6931554__340.png",
    };
    setUserCharacterList([...userCharacterList, tempAxiosData]);
  };

  return (
    <div>
      <div>
        <UserPageCharacterImageList
          userCharacterList={userCharacterList}
          insertFuc={addImgList}
          deleteFuc={deleteImgList}
        ></UserPageCharacterImageList>
      </div>
    </div>
  );
}

export default UserPageCharacter;
const ToggleBtn = styled.button`
  width: 13rem;
  height: 11rem;
  border: none;
  cursor: pointer;
  background-color: ${(props) =>
    !props.toggle ? "transparent" : "rgb(231, 179, 35)"};
  transition: all 0.3s ease-in-out; /* 부드러운 모션을 위해 추가*/
  &:hover {
    transform: scale(1.2);
    -webkit-transform: scale(1.2);
    -moz-transform: scale(1.2);
    -ms-transform: scale(1.2);
    -o-transform: scale(1.2);
  }
`;
const AppStyle = styled.div`
  margin: 25rem 0 0 30rem;
  img {
    width: 3.5rem;
    height: 3.5rem;
  }
  label {
    display: absolute;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;
  }
  input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;
