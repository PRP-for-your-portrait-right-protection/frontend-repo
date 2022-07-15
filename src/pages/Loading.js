import React from "react";
import "./Loading.css";
import Button2 from "../components/Button2";

function Loading() {
  return (
    <div>
      <Button2
        img="images\icons8-arrows-64 (2) 1.png"
        url="/Result"
        design="previous"
      ></Button2>
      <Button2
        img="images\icons8-arrows-64 (2) 2.png"
        url="/videoResult"
        design="next"
      ></Button2>
      <div className="conversion">
        <div>Processing conversion</div>
        <img src="images/stop.png" alt="" className="stop" />
      </div>
    </div>
  );
}

export default Loading;
