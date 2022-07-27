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
      <div className="fixed bottom-0 right-0 p-5">
        <ButtonSession
          img="images/rightArrow.png"
          url="/video"
          saveFuc={makeFormData}
        ></ButtonSession>
      </div>
      <div className="fixed bottom-0 left-0 p-5">
        <ButtonSession
          img="images/leftArrow.png"
          url="/Mosaic"
          saveFuc={null}
        ></ButtonSession>
      </div>

      <Title textValue="Selected Result"></Title>
      <div className="wrapResult">
        <ul className="result">
          <li>
            <div>
              Uploaded pictures :
              {+JSON.parse(sessionStorage.getItem("images")).length}
            </div>
          </li>
          <li>
            <div>Uploaded video</div>
          </li>
          <li>
            <div>
              Processing effect :
              {sessionStorage.getItem("character") === "M"
                ? "Mozaic"
                : "Character"}
            </div>
          </li>
          <li>
            <div>Estimated Processing Time</div>
          </li>
        </ul>
      </div>
      <button onClick={() => makeFormData()}>asdsad</button>
    </div>
  );
}

export default Result;
