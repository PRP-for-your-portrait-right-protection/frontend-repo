import React from "react";
import "./ListButton.css";
import Navigation from "./Navigation";

/**
 * @name : minji
 * @component :ListButton - Navigation컴포넌트 이용하여 페이지 이동
 * @create-data: 2022-07-15
 */

function ListButton() {
  return (
    <div className="a">
      <nav className="navbar">
        <div>
          <Navigation url="Photo" name="PHOTO" />
        </div>
        <div>
          <Navigation url="Video" name="VIDEO" />
        </div>
        <div>
          <Navigation url="Character" name="CHARACTER" />
        </div>
      </nav>
      <hr className="hr3"></hr>
    </div>
  );
}

export default ListButton;
