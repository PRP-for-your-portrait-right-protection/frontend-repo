import React from "react";
import "./BasicButton2.css";
import { Link } from "react-router-dom";

function BasicButton2() {
  return (
    <div>
      <Link to="/">
        <img src="images\iconoir_home.png" alt="/" className="home" />
      </Link>
      <Link to="">
        <img src="images\admin.png" alt="" className="admin" />
      </Link>
      <Link to="/">
        <img src="images\signout.png" alt="/" className="signOut" />
      </Link>
    </div>
  );
}

export default BasicButton2;
