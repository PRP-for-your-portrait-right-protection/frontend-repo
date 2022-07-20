import React from "react";
import "./Loading.css";
import Button from "components/Button";
import Title from "components/Title";
import styled from "styled-components";

function Loading() {
  return (
    <div>
      <div className="fixed bottom-0 right-0 p-5">
        <Button img="images/rightArrow.png" url="/videoResult"></Button>
      </div>
      <div className="fixed bottom-0 left-0 p-5">
        <Button img="images/leftArrow.png" url="/Result"></Button>
      </div>
      <Title textValue="Processing conversion"></Title>
      <Background>
        <img
          src="images\Spinner-1s-200px.gif"
          alt="로딩중"
          width="10%"
          background-color="transparent"
        />
      </Background>
      <img src="images/stop.png" alt="" className="stop" />
    </div>
  );
}

export default Loading;

// Styles.js

export const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: transparent;
  z-index: -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
