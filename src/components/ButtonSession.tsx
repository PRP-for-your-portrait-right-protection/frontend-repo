import React, { useState } from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  img: string;
  url: string;
  text: string;
  saveFuc: () => void;
}

function ButtonSession({ img, url, text, saveFuc }: ButtonProps) {
  return (
    <Link to={url} onClick={saveFuc}>
      <button className={text}>
        <div>{text}</div>
        <img src={img} alt={text} />
      </button>
    </Link>
  );
}

export default ButtonSession;
