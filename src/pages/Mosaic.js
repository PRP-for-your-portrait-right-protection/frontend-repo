import React, { useState, useRef } from "react";
import "./Mosaic.css";
import Modal from "../components/Modal";
import Button from "components/Button";
import styled from "styled-components";
import Title from "components/Title";
import CharacterImageList from "components/CharacterImageList";
function Mosaic() {
  const [modal, setModal] = useState(false); //스위치 역할
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [characterList, setCharacterList] = useState([
    "https://www.newsworks.co.kr/news/photo/202002/433057_327801_345.jpg",
    "https://img.seoul.co.kr/img/upload/2017/10/07/SSI_20171007154542_O2.jpg",
    "https://www.kocca.kr/cmm/fnw/getImage.do?atchFileId=FILE_000000000296370&fileSn=1",
    "https://gwgs.go.kr/images/kor/sub05/sub050304_img01.jpg",
  ]);
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const clickedToggle1 = () => {
    setToggle1(true);
    setToggle2(false);
  };

  const clickedToggle2 = () => {
    setToggle2(true);
    setToggle1(false);
  };

  return (
    <div>
      <Button2
        img="images\icons8-arrows-64 (2) 1.png"
        url="/VideoUpload"
        design="previous"
      ></Button2>

      <Button2
        img="images\icons8-arrows-64 (2) 2.png"
        url="/Result"
        design="next"
      ></Button2>
      <Title textValue="Select the image Processing type"></Title>

      <div className="item">
        <ToggleBtn onClick={clickedToggle1} toggle={toggle1}>
          <img src="images\mosaic.png" alt="" />
          <span className="caption">MOSAIC</span>
        </ToggleBtn>
      </div>
      <div className="item">
        <ToggleBtn onClick={clickedToggle2} toggle={toggle2}>
          <img src="images\character.png" alt="" onClick={openModal} />
          <span className="caption">CHARACTER</span>
        </ToggleBtn>

        <Modal open={modal} close={closeModal}>
          <div>
            <div className="modalFont1">CHARACTER</div>
            <div className="modalFont2">MY CHARACTER</div>

            <CharacterImageList
              characterList={characterList}
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
      <input type="checkbox" id="ch" />
      {/* <label>
        <span className="caption">MOSAIC</span>
      </label> */}
    </div>
  );
}

export default Mosaic;
/* const ToggleBtn = styled.button`
  width: 12rem;
  height: 11.3rem;
  border: none;
  cursor: pointer;
  background-color: ${(props) =>
    !props.toggle ? "transparent" : "rgb(231, 179, 35)"};
  position: center;
  display: flex;
  transition: all 0.3s ease-in-out; /* 부드러운 모션을 위해 추가*/

/*  &:hover {
    transform: scale(1.2);
    -webkit-transform: scale(1.2);
    -moz-transform: scale(1.2);
    -ms-transform: scale(1.2);
    -o-transform: scale(1.2);
  } */

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
