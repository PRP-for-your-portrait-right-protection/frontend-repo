import React from "react";
import { Link } from "react-router-dom";
import styles from "./BasicButton.module.css";

function BasicButton() {
  return (
    <div>
      <Link to="/result">
        <img src="images\admin.png" className={styles.admin} />
      </Link>
      <Link to="/">
        <img src="images\signout.png" className={styles.signOut} />
      </Link>
    </div>
  );
}

export default BasicButton;
