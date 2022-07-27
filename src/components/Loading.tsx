import React, { useState } from "react";
import styled from "styled-components";

function Loading() {
  return (
    <Background>
      <img
        src="images\Spinner-1s-200px.gif"
        alt="로딩중"
        width="10%"
        background-color="transparent"
      />
    </Background>
  );
}

export default Loading;

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
