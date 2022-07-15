import React, { useEffect, useState } from "react";
import "./ListButton.css";
import { Link } from "react-router-dom";

function ListButton() {
  const [currentClick, setCurrentClick] = useState(null);
  const [prevClick, setPrevClick] = React.useState(null);
  const GetClick = (e) => {
    setCurrentClick(e.target.id);
  };

  useEffect(
    (e) => {
      if (currentClick !== null) {
        let current = document.getElementById(currentClick);
        current.style.color = "orange";
        current.style.borderBottom = "2px solid";
        current.style.borderBottomColor = "#1c28f4";
      }
      if (prevClick !== null) {
        let prev = document.getElementById(prevClick);
        prev.style.color = "white";
        prev.style.borderBottom = "none";
      }
      setPrevClick(currentClick);
    },
    [currentClick]
  );
  return (
    <div>
      <Link to="/Video">
        <button id="video" className="button1" width="20%" onClick={GetClick}>
          VIDEO
        </button>
      </Link>
      <Link to="/Photo">
        <button id="photo" className="button2" width="20%" onClick={GetClick}>
          PHOTO
        </button>
      </Link>
      <Link to="/Character">
        <button
          id="character"
          className="button3"
          width="40%"
          onClick={GetClick}
        >
          CHARACTER
        </button>
      </Link>
      <hr className="hr3"></hr>
    </div>
  );
}

export default ListButton;
