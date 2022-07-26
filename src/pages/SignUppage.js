import React from "react";
import styles from "./Loginpage.module.css";
import { Link } from "react-router-dom";
import SignUp from "../components/SignUp";
function SignUppage() {
  return (
    //실제 화면에 출력할 내용들 설정 해주는 곳
    <div className={styles.img_1}>
      <Link to="/">
        <img src="images\iconoir_home.png" className={styles.home} />
      </Link>
      <div>
        <div className={styles.For_Your_Login}>
          For Your
          <div className={styles.text_style_1}>PRP</div>
          <div className={styles.portrait_right_protection_Login}>
            portrait right protection
          </div>
        </div>
      </div>
      <SignUp />
    </div>
  );
}

export default SignUppage;
