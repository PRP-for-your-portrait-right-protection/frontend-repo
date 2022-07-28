import React, { useEffect, useState } from "react";
import styles from "./Mainpage.module.css";
import { Link } from "react-router-dom";
function Mainpage() {
  const [token, setToken] = useState(false);

  const Checktoken = localStorage.getItem("token");

  useEffect(() => {
    if (Checktoken !== null) {
      setToken(true);
    }
    console.log(token);
  }, [token]);

  // 토큰이 존재할 경우 메인페이지(회원)
  // 아닐 경우 메인페이지(로그인 전) 보여줍니다.
  return (
    <>
      {token ? (
        <div className={styles.img_1}>
          <div>
            <img src="images\admin.png" className={styles.admin} />
            <Link to="/">
              <button
                className={styles.signOut}
                onClick={() => {
                  localStorage.clear();
                  setToken(false);
                }}
              >
                <img src="images\signout.png" />
              </button>
            </Link>
          </div>
          <div className={styles.section}>
            <div className={styles.For_Your_Login}>
              For Your
              <div className={styles.text_style_1}>PRP</div>
              <div className={styles.portrait_right_protection_Login}>
                portrait right protection
              </div>
            </div>
          </div>
          <div>
            <Link to={"/upload"}>
              <button className={styles.button1}>START</button>
            </Link>
          </div>
          <div>
            <Link to={"/photo"}>
              <button className={styles.button2}>PHOTO</button>
            </Link>
          </div>
          <div>
            <Link to={"/video"}>
              <button className={styles.button3}>VIDEO</button>
            </Link>
          </div>
          <div>
            <Link to={"/character"}>
              <button className={styles.button4}>CHARACTER</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.img_1}>
          <div className={styles.section}>
            <div className={styles.For_Your_Login}>
              For Your
              <div className={styles.text_style_1}>PRP</div>
              <div className={styles.portrait_right_protection_Login}>
                portrait right protection
              </div>
            </div>
          </div>
          <div>
            <Link to={"/signin"}>
              <button className={styles.button1}>SIGH IN</button>
            </Link>
            <Link to={"/signup"}>
              <button className={styles.button2}>SIGH UP</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Mainpage;
