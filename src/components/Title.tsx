import React, { useState } from "react";
import "./Title.css";

interface TitleProps {
  textValue: String;
}

function Title({ textValue }: TitleProps) {
  return (
    <div className="title-component  mt-28">
      <p className="text-6xl"> {textValue} </p>
      <hr />
    </div>
  );
}

export default Title;
