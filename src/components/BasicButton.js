import React from "react";
import { Link } from "react-router-dom";
import styles from "./BasicButton.module.css";

const onclick = () => {
  localStorage.clear();
};

function BasicButton() {
  return (
    <div>
      <img src="images\admin.png" className={styles.admin} />
      <Link to="/">
        <button className={styles.signOut} onClick={onclick}>
          <img src="images\signout.png" />
        </button>
      </Link>
    </div>
  );
}

export default BasicButton;
