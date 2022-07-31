import React, { useState, useRef, useEffect } from "react";
import axios from "../api/axios";
import "./Mosaic.css";
import Modal from "../components/Modal";
import styled from "styled-components";
import Title from "components/Title";
import CharacterImageList from "components/CharacterImageList";
import ButtonSession from "../components/ButtonSession";
import "../components/Step.css";
import { AiOutlineCheck } from "react-icons/ai";

function Mosaic() {
  const [modal, setModal] = useState(false); //스위치 역할
  const [toggleM, setToggleM] = useState(false); //Mosaic토글
  const [toggleC, setToggleC] = useState(false); //Character토글
  const [selectedData, setSelectedData] = useState(""); //최종으로 선택된 하나의 이미지
  const [characterList, setCharacterList] = useState([]); //기존 캐릭터 이미지
  const [userCharacterList, setUserCharacterList] = useState([]); // 사용자 캐릭터 이미지
  const [isNull, setisNull] = useState(true); //어떠한 동영상도 입력되지 않았다면 다음 페이지로 가지 않기

  /**
   * @name : Teawon
   * @function :useEffect - 캐릭터의 사진 및 사용자 캐릭터를 가져와 리스트에 설정
   * 만약 세션에 이전에 선택했던 정보가 들어있다면 selectedData에 값을 설정하여 복구
   * @create-date: 2022-07-22
   * @update-date: 2022-07-27
   * - api연결 및 구조 변경
   *
   */
  useEffect(() => {
    const fetchData = async () => {
      const resultFix = await axios
        .get(`block-characters/origin`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then(function (response) {
          console.log(response.data);
          setCharacterList(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });

      const resultUser = await axios
        .get(`block-characters/user`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then(function (response) {
          setUserCharacterList(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    fetchData();
    const preValue = sessionStorage.getItem("character");
    if (preValue != null) {
      selectedFuc(preValue);
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

  /**
   * @name : Teawon
   * @function :makeFormData - 다음 페이지로 넘어갈 때 보내는 api정보
   * @create-date: 2022-07-22
   * @update-date :2022-07-24
   * - 파일의 선택여부에 따라 백엔드로 파일객체값을 두 필드값으로 분리하여 보냄
   * - 응답값을 받아 session에 저장
   */
  const makeFormData = () => {
    sessionStorage.setItem("character", selectedData);
  };

  /**
   * @name : Teawon
   * @function :clickedToggleM(C) - 각 버튼이 눌리면 자신의 Toggle값을 활성화 및 상대방 활성화를 False
   * @create-data: 2022-07-18
   * @개선사항 : 향후 Radio버튼으로 변경하여 코드의 가독성을 높일 필요가 있을 것 같습니다.
   */

  const selectedFuc = (Characterid) => {
    setSelectedData(Characterid);
    setisNull(false);
  };

  const clickedToggleM = () => {
    setToggleM(true);
    setToggleC(false);
    selectedFuc("M");
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

  const deleteImgList = (imgId) => {
    setUserCharacterList(
      userCharacterList.filter((characterImg) => characterImg.id !== imgId)
    );
    axios
      .delete(`/block-characters/user/${imgId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const addImgList = (insertData) => {
    const formData = new FormData();
    formData.append("file", insertData);

    axios
      .post(`/block-characters/user`, formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then(function (response) {
        console.log(response.data);
        let tempAxiosData = {
          id: response.data.id,
          url: URL.createObjectURL(insertData),
        };
        setUserCharacterList([...userCharacterList, tempAxiosData]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      {isNull ? (
        <div className="fixed bottom-0 right-0 p-5 opacity-30">
          <img src="images/rightArrow.png" />
        </div>
      ) : (
        <div className="fixed bottom-0 right-0 p-5">
          <ButtonSession
            img="images/rightArrow.png"
            url="/Result"
            saveFuc={makeFormData}
          ></ButtonSession>
        </div>
      )}

      <div className="fixed bottom-0 left-0 p-5">
        <ButtonSession
          img="images/leftArrow.png"
          url="/VideoUpload"
          saveFuc={null}
        ></ButtonSession>
      </div>

      <Title
        textValue="Select the image Processing type"
        textTooltip="After selecting the target to be excluded from the mosaic, please upload the face image of the person."
      ></Title>

      <div className="stepper-wrapper">
        <div className="stepper-item completed">
          <div className="step-counter">
            {" "}
            <AiOutlineCheck size="20" color="white" />
          </div>
          <div className="step-name">Whitelist Picture</div>
        </div>
        <div className="stepper-item completed">
          <div className="step-counter">
            {" "}
            <AiOutlineCheck size="20" color="white" />
          </div>
          <div className="step-name">Video</div>
        </div>
        <div className="stepper-item active">
          <div className="step-counter">3</div>
          <div className="step-name">Effect</div>
        </div>
        <div className="stepper-item ">
          <div className="step-counter">4</div>
          <div className="step-name">Result</div>
        </div>
      </div>
      <div className="wrapChoice">
        <ul>
          <li>
            <ToggleBtn onClick={clickedToggleM} toggle={toggleM}>
              <img src="images\mosaic.png" alt="" className="choiceImage" />
            </ToggleBtn>
            <span className="caption">MOSAIC</span>
          </li>
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
                clickFuc={selectedFuc}
                insertFuc={addImgList}
                deleteFuc={deleteImgList}
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
