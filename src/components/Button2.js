import React, { useState } from "react";
import "./Button2.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Button2({ img, url, design }) {
  return (
    <Link to={url}>
      <img src={img} alt={img} className={design} />
    </Link>
  );
}

export default Button2;
Button2.propTypes = {
  img: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  design: PropTypes.string.isRequired,
};
