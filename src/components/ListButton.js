import React, { useState, useEffect } from "react";
import "./ListButton.css";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

function ListButton() {
  const [token, setToken] = useState(false);
  const [email, setEmail] = useState("");
  const [isactive, setActive] = useState(false);

  useEffect(() => {
    const checkToken = getItemWithExpireTime("token");
    const checkEmail = getItemWithExpireTime("email");
    if (checkToken !== null) {
      setToken(true);
      setEmail(checkEmail);
    }
  }, [email, token]);

  const getItemWithExpireTime = (keyName) => {
    const objString = localStorage.getItem(keyName);

    if (!objString) {
      return null;
    }

    const obj = JSON.parse(objString);

    if (Date.now() > obj.expire) {
      localStorage.removeItem(keyName);

      return null;
    }

    return obj.value;
  };

  const HandleToggle = () => {
    setActive(!isactive);
    console.log(isactive);
  };

  return (
    <nav className="navigation__wrapper">
      <div className="navbar__logo">
        <img src="images\path28.png" className="inline"></img>
        <Link to="/">PRP</Link>
      </div>
      <ul className={isactive ? "navbar__menu__active" : "navbar__menu"}>
        <li>
          <Navigation url="Photo" name="WHITELIST" />
        </li>
        <li>
          <Navigation url="video" name="VIDEO" />
        </li>
        <li>
          <Navigation url="character" name="CHARACTER" />
        </li>
      </ul>
      <ul className="navbar__info">
        <li> {email}</li>
        <Link to="/">
          <button
            className="navbar__button"
            onClick={() => {
              localStorage.clear();
              setToken(false);
            }}
          >
            Sign Out
          </button>
        </Link>
      </ul>
      <Link to="#" className="navbar__toggleBtn" onClick={HandleToggle}>
        <i className="fa-solid fa-bars"></i>
      </Link>
    </nav>
  );
}

export default ListButton;
/*
 <div className="header">
        <nav className="nav">
          <div className="flex mt-2">
            <Button img="images\iconoir_home.png" url="/main"></Button>
          </div>
          <li className="mx-16">
            <img src="images\admin.png" alt="userName" />
            <div className="flex text-base mx-3">User</div>
          </li>
          <li>
            <Button img="images\signout.png" url="/"></Button>
            <div className="flex w-16 text-base mt-1">Sign Out</div>
          </li>
        </nav>
      </div>

      <nav className="navbar">
        <ul className="navbar_menu">
          <li>
            <Navigation url="Photo" name="PHOTO" />
          </li>
          <li>
            <Navigation url="Video" name="VIDEO" />
          </li>
          <li>
            <Navigation url="Character" name="CHARACTER" />
          </li>
        </ul>
        <button className="toogle">
          <HiMenu className="fas" />
        </button>

        <hr className="hr3"></hr>
      </nav> */
