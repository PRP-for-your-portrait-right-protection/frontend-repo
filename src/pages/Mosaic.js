import React, { useState, useRef } from "react";
import "./Mosaic.css";
import Modal from "../components/Modal";
import Button from "../components/Button";
import styled from "styled-components";
import Title from "components/Title";
import CharacterImageList from "components/CharacterImageList";
function Mosaic() {
  const [modal, setModal] = useState(false); //스위치 역할
  const [toggleM, setToggleM] = useState(false); //Mosaic토글
  const [toggleC, setToggleC] = useState(false); //Character토글
  const [selectedData, setSelectedData] = useState(null); //최종으로 선택된 하나의 이미지
  const [characterList, setCharacterList] = useState([
    //임시로 넣은 기존캐릭터(고정값)
    "https://www.newsworks.co.kr/news/photo/202002/433057_327801_345.jpg",

    "https://img.seoul.co.kr/img/upload/2017/10/07/SSI_20171007154542_O2.jpg",

    "https://www.kocca.kr/cmm/fnw/getImage.do?atchFileId=FILE_000000000296370&fileSn=1",

    "https://gwgs.go.kr/images/kor/sub05/sub050304_img01.jpg",
  ]);
  const [userCharacterList, setUserCharacterList] = useState([
    //임시로 넣은 사용자캐릭터(고정값)
    "https://image.idus.com/image/files/58c639aa4a454c9887eb3cd2ced2b3ff.gif",

    "https://i.pinimg.com/originals/67/c4/28/67c428560442f7aa423d7fdfc1ff88ea.gif",

    "https://i.pinimg.com/originals/f7/b2/de/f7b2de46108993ffb90984b0173ae9c9.gif",

    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_WEEfYdRouYlbmOlyxQguFxiHNTTbbhVZ855Q5qIgDUrVTURfCC2aeBhAwv0Sg2h3yLs&usqp=CAU",
  ]);
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
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
  };

  const clickedToggleC = () => {
    setToggleC(true);
    setToggleM(false);
  };

  return (
    <div>
      <div className="fixed bottom-0 right-0 p-5">
        <Button img="images/rightArrow.png" url="/Result"></Button>
      </div>
      <div className="fixed bottom-0 left-0 p-5">
        <Button img="images/leftArrow.png" url="/VideoUpload"></Button>
      </div>

      <Title textValue="Select the image Processing type"></Title>

      <div className="item">
        <ToggleBtn onClick={clickedToggleM} toggle={toggleM}>
          <img src="images\mosaic.png" alt="" />
          <span className="caption">MOSAIC</span>
        </ToggleBtn>
      </div>
      <div className="item">
        <ToggleBtn onClick={clickedToggleC} toggle={toggleC}>
          <img src="images\character.png" alt="" onClick={openModal} />
          <span className="caption">CHARACTER</span>
        </ToggleBtn>

        <Modal open={modal} close={closeModal}>
          <div>
            <CharacterImageList
              characterList={characterList}
              userCharacterList={userCharacterList}
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
      {/*  <CheckForm>
        <label htmlFor="ch">
          <input type="checkbox" name="check" id="check1" />
        </label>
      </CheckForm> */}
      <input type="checkbox" id="ch" />
      {/* <label>
        <span className="caption">MOSAIC</span>
      </label> */}
    </div>
  );
}

export default Mosaic;
const ToggleBtn = styled.button`
  width: 12rem;
  height: 11.3rem;
  border: none;
  cursor: pointer;
  background-color: ${(props) =>
    !props.toggle ? "transparent" : "rgb(231, 179, 35)"};
  position: center;
  display: flex;
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
/* const CheckForm = styled.div`
  label {
    display: absolute;
    font-size: 1em;
    font-weight: 600;
    margin-bottom: 0;
    input[type="checkbox"] {
      margin-right: px;
      width: 12.6rem;
      height: 10.4rem;
      background: $white no-repeat center center;
      border: 6px solid redk;
      cursor: pointer;
      outline: none;
      appearance: none;
      background-image: url("image/mosaic.png");
      img {
        width: 3.5rem;
        height: 3.5rem;
      }
    }
  }
  input[id="ch"]:checked + label {
    border: 6px solid #d21b1b;
  }
`; */
