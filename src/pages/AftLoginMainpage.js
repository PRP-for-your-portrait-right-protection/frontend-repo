import React from "react";
import styles from "./Mainpage.module.css";
import MainButton from "../components/MainButton";
import BasicButton from "../components/BasicButton";
import { Link } from "react-router-dom";

function AftLoginMainpage() {
  return (
    //실제 화면에 출력할 내용들 설정 해주는 곳
    <div className={styles.img_1}>
      <nav className="static pt-40">
        <BasicButton />
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
              className="absolute top-1/3 right-0 w-64 h-20 mt-12 text-3xl font-Stardos 
        text-center text-black hover:text-white bg-inherit hover:bg-amber-900 border-2 border-amber-900"
            >
              PHOTO
            </button>
          </Link>
        </div>
        <div>
          <Link to={"/video"}>
            <button
              className="absolute top-1/2 right-0 w-64 h-20 mt-12 text-3xl font-Stardos 
        text-center text-black hover:text-white bg-inherit hover:bg-amber-900 border-2 border-amber-900"
            >
              VIDEO
            </button>
          </Link>
        </div>
        <div>
          <Link to={"/character"}>
            <button
              className="absolute top-2/3 right-0 w-64 h-20 mt-12 text-3xl font-Stardos 
        text-center text-black hover:text-white bg-inherit hover:bg-amber-900 border-2 border-amber-900"
            >
              CHARACTER
            </button>
          </Link>
        </div>
      </aside>
    </div>
  );
}

export default AftLoginMainpage;
