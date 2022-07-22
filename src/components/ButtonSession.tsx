import React, { useState } from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  img: string;
  url: string;
  saveFuc: any;
}

function ButtonSession({ img, url, saveFuc }: ButtonProps) {
  return (
    <Link to={url} onClick={saveFuc}>
      <img src={img} alt={img} />
    </Link>
  );
}

export default ButtonSession;
