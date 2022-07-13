import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./MainButton.module.css";

function MainButton({ title, text }) {
  return (
    <div>
      <Link to={`/${text}`}>
        <button className={styles.button}>{title}</button>
      </Link>
    </div>
  );
}

export default MainButton;

MainButton.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
