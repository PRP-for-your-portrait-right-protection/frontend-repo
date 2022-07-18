import React, { useState, useRef } from "react";
import "./Mosaic.css";
import Modal from "../components/Modal";
import Button from "components/Button";
import styled from "styled-components";
import Title from "components/Title";
import ChoiceCharacterResearch from "components/ChoiceCharacterResearch";

function Mosaic() {
  const [modal, setModal] = useState(false); //스위치 역할
  const [toggle, setToggle] = useState(false);
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const clickedToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div>
      <div className="absolute bottom-0 right-0 p-5">
        <Button img="images/rightArrow.png" url="/Result"></Button>
      </div>
      <div className="absolute bottom-0 left-0 p-5">
        <Button img="images/leftArrow.png" url="/VideoUpload"></Button>
      </div>
      <Title textValue="Select the image Processing type"></Title>
      {/* <div className="item">
       {/*  <ToggleBtn onClick={clickedToggle} toggle={toggle}>
          <img src="images\mosaic.png" alt="" />
        </ToggleBtn>
        <span className="caption">MOSAIC</span>
      </div> */}
      <div className="item">
        <button className="scale">
          <img src="images\character.png" alt="" onClick={openModal} />
          <span className="caption">CHARACTER</span>
        </button>
        <Modal open={modal} close={closeModal}>
          <div>
            <div className="modalFont1">CHARACTER</div>
            <div className="modalFont2">MY CHARACTER</div>
            <ChoiceCharacterResearch></ChoiceCharacterResearch>
          </div>
        </Modal>
      </div>
      <input type="checkbox" id="ch" />
      <label htmlFor="ch">
        <span className="caption">MOSAIC</span>
      </label>
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
