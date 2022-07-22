import React from "react";
import styles from "./Mainpage.module.css";
import { Link } from "react-router-dom";
import SignUp from "../components/SignUp";
function SignUppage() {
  return (
    //실제 화면에 출력할 내용들 설정 해주는 곳
    <div className={styles.img_1}>
      <Link to="/">
        <img src="images\iconoir_home.png" className={styles.home} />
      </Link>
      <nav className="static pt-40"></nav>
      <div className="w-3/5 float-left">
        <div className={styles.For_Your_Login}>
          For Your
          <div className={styles.text_style_1}>PRP</div>
        </div>
        <div className={styles.portrait_right_protection_Login}>
          portrait right protection
        </div>
      </div>
      <aside className="w-2/5 float-right">
        <div className={styles.login}>
          <SignUp />
        </div>
      </aside>
    </div>
  );
}

export default SignUppage;
