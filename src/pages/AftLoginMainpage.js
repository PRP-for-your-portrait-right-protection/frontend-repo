import React from "react";
import styles from "./Mainpage.module.css";
import MainButton from "../components/MainButton";
import OtherButton from "../components/OtherButton";
import BasicButton from "../components/BasicButton";

function AftLoginMainpage() {
  return (
    //실제 화면에 출력할 내용들 설정 해주는 곳
    <div className={styles.img_1}>
      <nav className="static pt-40">
        <BasicButton />
      </nav>
      <section className={styles.section}>
        <div className={styles.For_Your}>
          For Your
          <div className={styles.text_style_1}>PRP</div>
        </div>
        <div className={styles.portrait_right_protection}>
          portrait right protection
        </div>
      </section>
      <aside className={styles.aside}>
        <div>
          <MainButton title="START" text="upload" />
        </div>
        <div>
          <OtherButton title="PHOTO" text="photo" />
        </div>
        <div>
          <OtherButton title="VIDEO" text="video" />
        </div>
        <div>
          <OtherButton title="CHARACTER" text="character" />
        </div>
      </aside>
    </div>
  );
}

export default AftLoginMainpage;