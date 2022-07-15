import React from "react";
import "./Result.css";
import Button2 from "../components/Button2";
function Result() {
  return (
    <div>
      <Button2
        img="images\icons8-arrows-64 (2) 1.png"
        url="/Mosaic"
        design="previous"
      ></Button2>

      <Button2
        img="images\icons8-arrows-64 (2) 2.png"
        url="/Loading"
        design="next"
      ></Button2>

      <div className="Select">
        <div>Selected Result</div>
      </div>
      <div className="Pictures" top="403px">
        <div>Uploaded pictures</div>
      </div>
      <div className="Video" top="520px">
        <div>Uploaded video</div>
      </div>
      <div className="Effect">
        <div>Processing effect</div>
      </div>
      <div className="Estimated">
        <div>Estimated Processing Time</div>
      </div>
    </div>
  );
}

export default Result;
