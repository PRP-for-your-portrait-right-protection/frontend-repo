import React from "react";
import styles from "./Loginpage.module.css";
import Login from "../components/account/Login";
import { Link } from "react-router-dom";
function Loginpage() {
  return (
    //실제 화면에 출력할 내용들 설정 해주는 곳
    <div>
      <div>
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
            <div>Do you want to make mosaic videos?</div>
          </div>
        </div>
        <img
          src="images/casual-life-3d-excited-young-woman.png"
          className={styles.img}
        ></img>
      </div>
      <Login />
    </div>
  );
}

export default Loginpage;

// <div>
//   <div className={styles.For_Your_Login}>
//     For Your
//     <div className={styles.text_style_1}>PRP</div>
//     <div className={styles.portrait_right_protection_Login}>
//       portrait right protection
//     </div>
//   </div>
// </div>;
