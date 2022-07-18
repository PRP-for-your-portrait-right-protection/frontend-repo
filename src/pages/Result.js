import React from "react";
import "./Result.css";
import Button from "components/Button";
import Title from "components/Title";

function Result() {
  return (
    <div>
      <div className="absolute bottom-0 right-0 p-5">
        <Button img="images/rightArrow.png" url="/Loading"></Button>
      </div>
      <div className="absolute bottom-0 left-0 p-5">
        <Button img="images/leftArrow.png" url="/Mosaic"></Button>
      </div>

      <Title textValue="Selected Result"></Title>

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
