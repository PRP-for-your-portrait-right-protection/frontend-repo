import React from "react";
import "./Loading.css";
import Button from "components/Button";
import Title from "components/Title";

function Loading() {
  return (
    <div>
      <div className="absolute bottom-0 right-0 p-5">
        <Button img="images/rightArrow.png" url="/videoResult"></Button>
      </div>
      <div className="absolute bottom-0 left-0 p-5">
        <Button img="images/leftArrow.png" url="/Result"></Button>
      </div>

      <Title textValue="Processing conversion"></Title>
      <img src="images/stop.png" alt="" className="stop" />
    </div>
  );
}

export default Loading;
