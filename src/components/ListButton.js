import React, { useState } from "react";
import "./ListButton.css";
import Navigation from "./Navigation";
import Button from "components/Button";
import { HiFilm } from "react-icons/hi";
import { IoLogOutSharp } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
/**
 * @name : minji
 * @component :ListButton - Navigation컴포넌트 이용하여 페이지 이동
 * @create-data: 2022-07-15
 */

function ListButton() {
  const [menuToggle, setMenuToggle] = useState(false);
  const menu = [
    { name: "HOME", address: "/home" },
    { name: "PHOTO", address: "/photo" },
    { name: "VIDEO", address: "/video" },
    { name: "CHARACTER", address: "/character" },
  ];
  return (
    <nav className="navigation__wrapper">
      <div className="navbar__logo">
        <HiFilm className="mr-3" />
        PRP
      </div>
      <div
        className={!menuToggle ? "burger__menu" : "x__menu"}
        onClick={() =>
          menuToggle ? setMenuToggle(false) : setMenuToggle(true)
        }
      >
        <div className="burger_line1"></div>
        <div className="burger_line2"></div>
        <div className="burger_line3"></div>
      </div>
      <div
        className={[
          "menu__box",
          !menuToggle ? "menu__box__hidden" : "menu__box__visible",
        ].join(" ")}
      >
        <ul className="menu__list">
          <Navigation url="Home" name="HOME" />
          <Navigation url="Photo" name="PHOTO" />
          <Navigation url="Video" name="VIDEO" />
          <Navigation url="Character" name="CHARACTER" />
        </ul>
      </div>
      <div className="navbar__icons">
        <li>
          <HiOutlineUser size="2em" color="white" />
        </li>
        <li>
          <a href="/">
            <IoLogOutSharp size="2em" color="white" />
          </a>
        </li>
      </div>
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
