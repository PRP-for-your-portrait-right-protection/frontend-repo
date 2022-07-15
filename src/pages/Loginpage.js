import React from "react";
import styles from "./Mainpage.module.css";
import Login from "../components/Login";
function Loginpage() {
  return (
    //실제 화면에 출력할 내용들 설정 해주는 곳
    <div className={styles.img_1}>
      <nav className="static pt-40"></nav>
      <section className="w-3/5 float-left">
        <div className={styles.For_Your_Login}>
          For Your
          <div className={styles.text_style_1}>PRP</div>
        </div>
        <div className={styles.portrait_right_protection_Login}>
          portrait right protection
        </div>
      </section>
      <aside className="w-2/5 float-right">
        <div className={styles.login}>
          <Login />
        </div>
      </aside>
    </div>
  );
}

export default Loginpage;
