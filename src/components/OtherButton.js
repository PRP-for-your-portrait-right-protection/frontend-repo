import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function OtherButton({ title, text }) {
  return (
    <div>
      <Link to={`/${text}`}>
        <button
          className="w-64 h-20 mt-12 text-3xl font-Stardos 
        text-center text-black hover:text-white bg-inherit hover:bg-amber-900 border-2 border-amber-900"
        >
          {title}
        </button>
      </Link>
    </div>
  );
}

export default OtherButton;

OtherButton.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
