import React from "react";
import styles from "./Mainpage.module.css";
import MainButton from "../components/MainButton";
import { Link } from "react-router-dom";
function Mainpage() {
  return (
    //실제 화면에 출력할 내용들 설정 해주는 곳
    <div className={styles.img_1}>
      <nav className="static pt-40"></nav>
      <section className={styles.section}>
        <div className={styles.For_Your_Login}>
          For Your
          <div className={styles.text_style_1}>PRP</div>
        </div>
        <div className={styles.portrait_right_protection_Login}>
          portrait right protection
        </div>
      </section>
      <aside className={styles.aside}>
        <div>
          <MainButton title="START" text="upload" />
        </div>
        <div>
          <Link to={"/signin"}>
            <button
              className="absolute top-1/3 right-0 w-64 h-20 mt-12 text-3xl font-Stardos 
        text-center text-black hover:text-white bg-inherit hover:bg-amber-900 border-2 border-amber-900"
            >
              SIGH IN
            </button>
          </Link>
        </div>
        <div>
          <Link to={"/signup"}>
            <button
              className="absolute top-1/2 right-0 w-64 h-20 mt-12 text-3xl font-Stardos 
        text-center text-black hover:text-white bg-inherit hover:bg-amber-900 border-2 border-amber-900"
            >
              SIGH UP
            </button>
          </Link>
        </div>
      </aside>
    </div>
  );
}

export default Mainpage;
