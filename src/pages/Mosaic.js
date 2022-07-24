import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Mosaic.css";
import Modal from "../components/Modal";
import styled from "styled-components";
import Title from "components/Title";
import CharacterImageList from "components/CharacterImageList";
import ButtonSession from "../components/ButtonSession";
function Mosaic() {
  const [modal, setModal] = useState(false); //스위치 역할
  const [toggleM, setToggleM] = useState(false); //Mosaic토글
  const [toggleC, setToggleC] = useState(false); //Character토글
  const [selectedData, setSelectedData] = useState(""); //최종으로 선택된 하나의 이미지
  const [characterList, setCharacterList] = useState([]); //기존 캐릭터 이미지
  const [userCharacterList, setUserCharacterList] = useState([]); // 사용자 캐릭터 이미지
  const [inputCharacteList, setinputCharacteList] = useState([]); //사용자가 새로 입력한 이미지

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
    //mockApi 무료사용량 초과로 고정값 가져오는 임시 함수사용중입니다.
    const data1 = [
      "http://news.samsungdisplay.com/wp-content/uploads/2018/08/8.jpg",
    ];
    const data2 = [
      "https://lh3.googleusercontent.com/cS5nvr3r6Q16NoV6IuJLaauz7HNNRPnuHtsHleZ8du594H4EeiOjeNxV-Nq_w-qRA87TUedLQjTmqCG5s6jNZRp29n571FDWyditF-WJhfhQTY_73OM",
    ];

    setCharacterList(data1);
    setUserCharacterList(data2);
  }, []);

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  /**
   * @name : Teawon
   * @function :makeFormData - 다음 페이지로 넘어갈 때 보내는 api정보
   * @create-date: 2022-07-22
   * @update-date :2022-07-24
   * - 파일의 선택여부에 따라 백엔드로 파일객체값을 두 필드값으로 분리하여 보냄
   * - 응답값을 받아 session에 저장
   */
  const makeFormData = () => {
    console.log(selectedData);

    if (inputCharacteList != "") {
      //사용자가 파일을 추가로 입력했다면 backend로 api를 보냄
      const formData = new FormData();
      const checkUrl = process.env.REACT_APP_BUCKET_URL; //선택된 이미지가 버킷url & 사용자가 새로 추가했는 지 검사
      let notSelectedCharactersList = []; //선택되지 않은 파일 리스트

      if (!selectedData.startsWith(checkUrl)) {
        //선택된 이미지가 사용쟈가 추가한 파일
        formData.append("selectedCharacter", selectedData);
        inputCharacteList.forEach((notSelectedCharacter) => {
          if (notSelectedCharacter.name !== selectedData) {
            notSelectedCharactersList.push(notSelectedCharacter);
          }
        });
      } else {
        //선택된 이미지가 기존의 db에서 가져온 url
        notSelectedCharactersList = inputCharacteList;
      }
      formData.append("notSelectedCharacters", notSelectedCharactersList);

      // for (let key of formData.keys()) {
      //   console.log("FormData의 key를 확인합니다.");
      //   console.log(key);
      // }

      // // FormData의 value 확인
      // for (let value of formData.values()) {
      //   console.log("FormData의 Values를 확인합니다.");
      //   console.log(value);
      // }
      axios({
        method: "post",
        url: `https://d601a5df-dc71-481f-9ca6-f2d053dd56e7.mock.pstmn.io/video`,
        formData,
        headers: { Authorization: "Bearer " + localStorage.token },
      })
        .then(function (response) {
          console.log(response);
          if (response.data != null) {
            selectedData = response.data;
          }
        })
        .catch(function (error) {
          console.log("ERROR 발생");
          console.log(error);
        });
    }

    sessionStorage.setItem("character", selectedData);
  };

  /**
   * @name : Teawon
   * @function :clickedToggleM(C) - 각 버튼이 눌리면 자신의 Toggle값을 활성화 및 상대방 활성화를 False
   * @create-data: 2022-07-18
   * @개선사항 : 향후 Radio버튼으로 변경하여 코드의 가독성을 높일 필요가 있을 것 같습니다.
   */
  const clickedToggleM = () => {
    setToggleM(true);
    setToggleC(false);
    setSelectedData("M");
  };

  const clickedToggleC = () => {
    setToggleC(true);
    setToggleM(false);
  };

  /**
   * @name : Teawon
   * @function :addImgList - 사용자가 새로 추가한 캐릭터 이미지를 저장하는 함수
   * @create-data: 2022-07-22
   *
   */
  const addImgList = (insertData) => {
    setinputCharacteList([...inputCharacteList, insertData]);
  };

  const showData = () => {
    console.log(characterList);
    console.log(userCharacterList);
    console.log(inputCharacteList);
  };
  return (
    <div>
      <div className="fixed bottom-0 right-0 p-5">
        <ButtonSession
          img="images/rightArrow.png"
          url="/Result"
          saveFuc={makeFormData}
        ></ButtonSession>
      </div>
      <div className="fixed bottom-0 left-0 p-5">
        <ButtonSession
          img="images/leftArrow.png"
          url="/VideoUpload"
          saveFuc={null}
        ></ButtonSession>
      </div>

      <Title textValue="Select the image Processing type"></Title>
      <div className="wrapChoice">
        <ul>
          <li>
            <ToggleBtn onClick={clickedToggleM} toggle={toggleM}>
              <img src="images\mosaic.png" alt="" className="choiceImage" />
            </ToggleBtn>
            <span className="caption">MOSAIC</span>
          </li>
          {/* <li></li> */}
        </ul>
        <div>
          <ul>
            <li>
              <ToggleBtn onClick={clickedToggleC} toggle={toggleC}>
                <img
                  src="images\character.png"
                  alt=""
                  className="choiceImage"
                  onClick={openModal}
                />
              </ToggleBtn>
            </li>
            <li>
              <span className="caption ml-3">CHARACTER</span>
            </li>
          </ul>

          <Modal open={modal} close={closeModal}>
            <div>
              <CharacterImageList
                characterList={characterList}
                userCharacterList={userCharacterList}
                preSelectedImage={selectedData}
                inputCharacteList={inputCharacteList}
                clickFuc={setSelectedData}
                insertFuc={addImgList}
              ></CharacterImageList>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Mosaic;
const ToggleBtn = styled.button`
  display: flex;
  width: 15vw;
  height: 22vh;
  border: none;
  border-radius: 5px;
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
