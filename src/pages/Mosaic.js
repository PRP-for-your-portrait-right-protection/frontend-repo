import React, { useState, useRef } from "react";
import "./Mosaic.css";
import Modal from "../components/Modal";
import Button2 from "../components/Button2";
import styled from "styled-components";
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

      <div className="mosaicFont">
        <div>Select the image Processing type</div>
      </div>
      <hr className="hr1" />

      <div className="item">
        <ToggleBtn onClick={clickedToggle} toggle={toggle}>
          <img src="images\mosaic.png" alt="" />
        </ToggleBtn>
        <span className="caption">MOSAIC</span>
      </div>
      <div className="item">
        <button className="scale">
          <img src="images\character.png" alt="" onClick={openModal} />
          <span className="caption">CHARACTER</span>
        </button>
        <Modal open={modal} close={closeModal}>
          <div>
            <div className="modalFont1">CHARACTER</div>
            <div className="modalFont2">MY CHARACTER</div>

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
      <label>
        <span className="caption">MOSAIC</span>
      </label>
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
