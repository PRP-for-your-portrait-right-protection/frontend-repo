import React, { useEffect, useState } from "react";
import styles from "./Mainpage.module.css";
import MainButton from "../components/MainButton";
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
          <nav className="static pt-40">
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
          </nav>
          <div className={styles.section}>
            <div className={styles.For_Your_Login}>
              For Your
              <div className={styles.text_style_1}>PRP</div>
            </div>
            <div className={styles.portrait_right_protection_Login}>
              portrait right protection
            </div>
          </div>
          <aside className={styles.aside}>
            <div>
              <MainButton title="START" text="upload" />
            </div>
            <div>
              <Link to={"/photo"}>
                <button
                  className="absolute top-1/3 right-0 w-64 h-20 mt-12 
            text-3xl font-Stardos text-center text-black hover:text-white 
            bg-inherit hover:bg-amber-900 border-2 border-amber-900"
                >
                  PHOTO
                </button>
              </Link>
            </div>
            <div>
              <Link to={"/video"}>
                <button
                  className="absolute top-1/2 right-0 w-64 h-20 mt-12 
            text-3xl font-Stardos text-center text-black hover:text-white 
            bg-inherit hover:bg-amber-900 border-2 border-amber-900"
                >
                  VIDEO
                </button>
              </Link>
            </div>
            <div>
              <Link to={"/character"}>
                <button
                  className="absolute top-2/3 right-0 w-64 h-20 mt-12 
            text-3xl font-Stardos text-center text-black hover:text-white 
            bg-inherit hover:bg-amber-900 border-2 border-amber-900"
                >
                  CHARACTER
                </button>
              </Link>
            </div>
          </aside>
        </div>
      ) : (
        <div className={styles.img_1}>
          <nav className="static pt-40"></nav>
          <div className={styles.section}>
            <div className={styles.For_Your_Login}>
              For Your
              <div className={styles.text_style_1}>PRP</div>
            </div>
            <div className={styles.portrait_right_protection_Login}>
              portrait right protection
            </div>
          </div>
          <aside className={styles.aside}>
            <div>
              <Link to={"/signin"}>
                <button
                  className="absolute top-40 right-0 w-64 h-20 mt-12 
        text-3xl font-Stardos text-center text-black hover:text-white 
        bg-inherit hover:bg-amber-900 border-2 border-amber-900"
                >
                  SIGH IN
                </button>
              </Link>
            </div>
            <div>
              <Link to={"/signup"}>
                <button
                  className="absolute top-1/3 right-0 w-64 h-20 mt-12
        text-3xl font-Stardos text-center text-black hover:text-white 
        bg-inherit hover:bg-amber-900 border-2 border-amber-900"
                >
                  SIGH UP
                </button>
              </Link>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

export default Mainpage;
