import React from "react";
import styles from "./ResultVideopage.module.css";
import { Link } from "react-router-dom";

function ResultVideopage() {
  return (
    <div className={styles.back}>
      <Link to="/">
        <img src="images\iconoir_home.png" className={styles.home} />
      </Link>
      <nav className="pt-32"></nav>
      <div>
        <h1 className={styles.Video_conversion_complete}>
          Video conversion complete!
        </h1>
        <iframe
          className={styles.video}
          src="https://www.youtube.com/embed/6Gtz3jGEfps"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <button className={styles.button}>
        <img src="images/Vector.png" className={styles.img}></img>Save
      </button>
    </div>
  );
}

export default ResultVideopage;
/*
<video className={styles.video}>
         <source src="" type="video/mp4" />
          Your browser does not support the video.
        </video>  
*/
