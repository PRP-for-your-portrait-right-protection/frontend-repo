import React, { useState } from "react";
import "./MainNavigation.css";
import Navigation from "./Navigation";
import { IoLogOutSharp } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";

function MainNavigation() {
  return (
    <nav className="wrapper">
      <div className="logo">
        <li className="flex">
          <a href="/">
            <img src="/images/logo2.png" alt="logo" />
          </a>
        </li>
      </div>
      <div className="icons">
        <li>
          <HiOutlineUser size="2em" color="black" />
        </li>
        <li>
          <a href="/">
            <IoLogOutSharp size="2em" color="black" />
          </a>
        </li>
      </div>
    </nav>
  );
}

export default MainNavigation;
