import React, { useEffect, useState } from "react";
import styles from "./Mainpage.module.css";
import { Link } from "react-router-dom";
import { useStore } from "../store/store";
function Mainpage() {
  const { removeAllByLogout } = useStore(); //zustand 전역변수
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
    return obj.value;
  };

  const HandleToggle = () => {
    setActive(!isactive);
  };

  // 토큰이 존재할 경우 메인페이지(회원)
  // 아닐 경우 메인페이지(로그인 전) 보여줍니다.
  return (
    <>
      {token ? (
        <div>
          <nav className={styles.navbarafter}>
            <div className={styles.navbar__logo}>
              <img src="images\path28.png" className="inline"></img>
              <Link to="/">PRP</Link>
            </div>
            <ul
              className={
                isactive ? styles.navbar__menu__active : styles.navbar__menu
              }
            >
              <li>
                <Link to="/user/photo">WHITELIST</Link>
              </li>
              <li>
                <Link to="/user/video">VIDEO</Link>
              </li>
              <li>
                <Link to="/user/character">CHARACTER</Link>
              </li>
            </ul>
            <ul className={styles.navbar__info}>
              <li> {email}</li>
              <Link to="/">
                <button
                  className={styles.navbar__button}
                  onClick={() => {
                    localStorage.clear();
                    removeAllByLogout();

                    setToken(false);
                  }}
                >
                  Sign Out
                </button>
              </Link>
            </ul>
            <Link
              to="#"
              className={styles.navbar__toggleBtn}
              onClick={HandleToggle}
            >
              <i className="fa-solid fa-bars"></i>
            </Link>
          </nav>
          <div className={styles.For_Your_PRP}>
            For Your PRP
            <div className={styles.PRP}>
              portrait right protection
              <div>Do you want to make mosaic videos?</div>
            </div>
            <Link to="/whitelist-face">
              <button className={styles.For_Your_PRP_button}>
                <span>start</span>
              </button>
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
            src="\images\casual-life-3d-excited-young-woman.png"
            className={styles.img}
          ></img>
          <nav className={styles.navbarbefore}>
            <div className={styles.navbar__logo}>
              <img src="\images\path28.png" className="inline"></img>
              <Link to="/">PRP</Link>
            </div>
          </nav>
          <div className={styles.For_Your_PRP}>
            For Your PRP
            <div className={styles.PRP}>
              portrait right protection
              <div>Do you want to make mosaic videos?</div>
            </div>
            <Link to="/signin">
              <button className={styles.For_Your_PRP_button}>
                <span>Sign in</span>
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Mainpage;
