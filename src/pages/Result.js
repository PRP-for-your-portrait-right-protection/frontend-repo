import React from "react";
import "./Result.css";
import Title from "components/Title";
import ButtonSession from "../components/ButtonSession";

function Result() {
  const makeFormData = () => {
    console.log(JSON.parse(sessionStorage.getItem("images")).length);
    JSON.parse(sessionStorage.getItem("images")).map((element) => {
      console.log(element);
    });

    console.log(sessionStorage.getItem("character"));
  };

  return (
    <div>
      <div className="absolute bottom-0 right-0 p-5">
        <ButtonSession
          img="images/rightArrow.png"
          url="/video"
          saveFuc={makeFormData}
        ></ButtonSession>
      </div>
      <div className="absolute bottom-0 left-0 p-5">
        <ButtonSession
          img="images/leftArrow.png"
          url="/Mosaic"
          saveFuc={null}
        ></ButtonSession>
      </div>

      <Title textValue="Selected Result"></Title>

      <div className="Pictures" top="403px">
        <div>
          Uploaded pictures :
          {+JSON.parse(sessionStorage.getItem("images")).length}
        </div>
      </div>
      <div className="Video" top="520px">
        <div>Uploaded video</div>
      </div>
      <div className="Effect">
        <div>
          Processing effect :
          {sessionStorage.getItem("character") === "M" ? "Mozaic" : "Character"}
        </div>
      </div>
      <div className="Estimated">
        <div>Estimated Processing Time</div>
      </div>

      <button onClick={() => makeFormData()}>asdsad</button>
    </div>
  );
}

export default Result;
