import React, { useEffect, useState } from "react";
import styles from "./Mainpage.module.css";
import { Link } from "react-router-dom";
function Mainpage() {
  const [token, setToken] = useState(false);
  const [name, setName] = useState("");
  const [isactive, setActive] = useState(false);

  const Checktoken = localStorage.getItem("token");

  const HandleToggle = () => {
    setActive(!isactive);
    console.log(isactive);
  };

  useEffect(() => {
    if (Checktoken !== null) {
      setToken(true);
      setName(localStorage.getItem("name"));
    }
    console.log(token);
  }, [name, token]);

  // 토큰이 존재할 경우 메인페이지(회원)
  // 아닐 경우 메인페이지(로그인 전) 보여줍니다.
  return (
    <>
      {token ? (
        <div>
          <nav className={styles.navbarafter}>
            <div className={styles.navbar__logo}>
              <img src="images\path28.png" className="inline"></img>
              <a href="/">PRP</a>
            </div>
            <ul
              className={
                isactive ? styles.navbar__menu__active : styles.navbar__menu
              }
            >
              <li>
                <a href="/photo">PHOTO</a>
              </li>
              <li>
                <a href="/video">VIDEO</a>
              </li>
              <li>
                <a href="/character">CHARACTER</a>
              </li>
            </ul>
            <ul className={styles.navbar__info}>
              <li>{name} 님 환영합니다.</li>
              <Link to="/">
                <button
                  className={styles.navbar__button}
                  onClick={() => {
                    localStorage.clear();
                    setToken(false);
                  }}
                >
                  Sign Out
                </button>
              </Link>
            </ul>
            <a
              href="#"
              className={styles.navbar__toggleBtn}
              onClick={HandleToggle}
            >
              <i className="fa-solid fa-bars"></i>
            </a>
          </nav>
          <div className={styles.For_Your_PRP}>
            For Your PRP
            <div className={styles.PRP}>
              portrait right protection
              <div>Are you want to make mosaic videos?</div>
            </div>
            <Link to="/upload">
              <button className={styles.For_Your_PRP_button}>Start!</button>
            </Link>
            <img
              src="images/casual-life-3d-excited-young-woman.png"
              className={styles.img}
            ></img>
          </div>
        </div>
      ) : (
        <div>
          <img
            src="images/casual-life-3d-excited-young-woman.png"
            className={styles.img}
          ></img>
          <nav className={styles.navbarbefore}>
            <div className={styles.navbar__logo}>
              <img src="images\path28.png" className="inline"></img>
              <a href="/">PRP</a>
            </div>
          </nav>
          <div className={styles.For_Your_PRP}>
            For Your PRP
            <div className={styles.PRP}>
              portrait right protection
              <div>Are you want to make mosaic videos?</div>
            </div>
            <Link to="/signin">
              <button className={styles.For_Your_PRP_button}>Sign in</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Mainpage;
