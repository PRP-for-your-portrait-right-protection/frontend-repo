import React, { useState } from "react";
import "./Tooltip.css";
import { AiOutlineQuestionCircle } from "react-icons/ai";

interface TooltipProps {
  tooltipText: any;
}

function Tooltip({ tooltipText }: TooltipProps) {
  return (
    <span className="tooltip">
      <AiOutlineQuestionCircle className="icon_tooltip" />
      <span className="tooltip-text">{tooltipText}</span>
    </span>
  );
}

export default Tooltip;
