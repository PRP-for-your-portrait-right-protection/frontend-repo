import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Mosaic.css";
import Modal from "../components/Modal";
import Button from "../components/Button";
import styled from "styled-components";
import Title from "components/Title";
import CharacterImageList from "components/CharacterImageList";
import ButtonSession from "../components/ButtonSession";
function Mosaic() {
  const [modal, setModal] = useState(false); //스위치 역할
  const [toggleM, setToggleM] = useState(false); //Mosaic토글
  const [toggleC, setToggleC] = useState(false); //Character토글
  const [selectedData, setSelectedData] = useState(""); //최종으로 선택된 하나의 이미지
  const [characterList, setCharacterList] = useState([]);
  const [userCharacterList, setUserCharacterList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios
        .get(
          `https://9bac662b-822f-45f7-854a-1d5ff7069263.mock.pstmn.io/character`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then(function (response) {
          setCharacterList(response.data.fixCharacter);
          setUserCharacterList(response.data.personalCharacter);
        })
        .catch(function (error) {
          console.log("error");
          console.log(error);
        });
    };
    // if (localStorage.getItem("token") != null) {
    //   fetchData();
    // } else {
    //   setIsLoading(true); //만약 로그인이 되어있지 않다면 api를 보내지 않고 바로 로딩을 완료시킨다.
    // }

    fetchData();

    const preValue = sessionStorage.getItem("character");
    if (preValue != null) {
      setSelectedData(preValue);
      if (preValue === "M") {
        clickedToggleM();
      } else {
        clickedToggleC();
      }
    }
  }, []);

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  const makeFormData = () => {
    console.log("선택된 이미지");
    console.log(selectedData);

    const checkUrl = process.env.REACT_APP_BUCKET_URL;
    console.log(checkUrl);

    if (selectedData.startsWith(checkUrl)) {
      console.log("선택된 내용이 파일이 아닙니다.");
      //backend로 모든 입력된 파일만 보낸 후 , url은 받지않고 기존값 기록해서 넘기기
    } else {
      console.log("선택된 내용이 파일입니다.");

      //backend api통신 후 , 해당 파일값만 selected로 보내기
      //그리고 받은 url정보를 기록해서 다음페이지로 이동
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

  return (
    <div>
      <div className="absolute bottom-0 right-0 p-5">
        <ButtonSession
          img="images/rightArrow.png"
          url="/Result"
          saveFuc={makeFormData}
        ></ButtonSession>
      </div>
      <div className="absolute bottom-0 left-0 p-5">
        <ButtonSession
          img="images/leftArrow.png"
          url="/VideoUpload"
          saveFuc={null}
        ></ButtonSession>
      </div>

      <Title textValue="Select the image Processing type"></Title>

      <div className="flex justify-center mt-36 ml-15">
        <div className="inline-block px-32">
          <ToggleBtn onClick={clickedToggleM} toggle={toggleM}>
            <img src="images\mosaic.png" alt="" className="p-2" />
          </ToggleBtn>
          <span className="caption ml-11">MOSAIC</span>
        </div>
        <div className="inline-block px-32">
          <ToggleBtn onClick={clickedToggleC} toggle={toggleC}>
            <img
              src="images\character.png"
              alt=""
              className="p-2"
              onClick={openModal}
            />
          </ToggleBtn>
          <span className="caption ml-3">CHARACTER</span>

        <Modal open={modal} close={closeModal}>
          <div>
            <CharacterImageList
              characterList={characterList}
              userCharacterList={userCharacterList}
              preSelectedImage={selectedData}
              clickFuc={setSelectedData}
            ></CharacterImageList>

              <AppStyle>
                <label htmlFor="ex_file">
                  <div className="btnStart">
                    <img src="images\download.png" alt="btnStart" />
                  </div>
                </label>
                <input
                  type="file"
                  id="ex_file"
                  onChange={(e) => console.log(e.target.files[0])}
                />
              </AppStyle>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Mosaic;
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
