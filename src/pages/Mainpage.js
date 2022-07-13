import React from "react";
import styles from "./Mainpage.module.css";
import MainButton from "C:/Users/User/Documents/GitHub/docker-repo/frontend-repo/src/components/MainButton.js";

function Mainpage() {
  return (
    //실제 화면에 출력할 내용들 설정 해주는 곳
    <div className={styles.img_1}>
      <div className={styles.text_style_1}>
        For Your
        <span>
          <div className={styles.text_style_1}>PRP</div>
          <div className={styles.text_style_2}>portrait right protection</div>
        </span>
      </div>
      <div>
        <MainButton title="Start" text="upload" />
      </div>
      <div>
        <MainButton title="Sign in" text="signin" />
      </div>
      <div>
        <MainButton title="Sign up" text="signup" />
      </div>
    </div>
  );
}

export default Mainpage;
