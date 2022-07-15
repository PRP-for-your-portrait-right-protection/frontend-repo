import React, { useState } from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  img: string;
  url: string;
}

function Button({ img, url }: ButtonProps) {
  return (
    <Link to={url}>
      <img src={img} alt={img} />
    </Link>
  );
}

export default Button;
