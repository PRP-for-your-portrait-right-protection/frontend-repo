import React, { useState } from "react";
import "./Title.css";

interface TitleProps {
  textValue: string;
}

function Title({ textValue }: TitleProps) {
  return (
    <div className="title-component  mt-28">
      <p className="textBasic"> {textValue} </p>
    </div>
  );
}

export default Title;
