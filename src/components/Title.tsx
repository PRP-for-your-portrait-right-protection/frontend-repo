import React, { useState } from "react";
import "./Title.css";
import Tooltip from "../components/Tooltip";

interface TitleProps {
  textValue: string;
  textTooltip: any;
}

function Title({ textValue, textTooltip }: TitleProps) {
  return (
    <ul>
      <li className="title-component flex mt-7">
        <span className="textBasic"> {textValue} </span>
      </li>
      <li>
        <Tooltip tooltipText={textTooltip}></Tooltip>
      </li>
    </ul>
  );
}

export default Title;
