import React from "react";
import "./Result.css";
import Title from "components/Title";
import ButtonSession from "../components/ButtonSession";

function Result() {
  const makeFormData = () => {
    const formData = new FormData();
    formData.append("video", fileVideo);

    axios({
      method: "post",
      url: `https://d601a5df-dc71-481f-9ca6-f2d053dd56e7.mock.pstmn.io/video`,
      formData,
      headers: { Authorization: "Bearer " + localStorage.token },
    })
      .then(function (response) {
        console.log(response.data.beforeVideosUrl);
        sessionStorage.setItem("video", response.data.beforeVideosUrl);
      })
      .catch(function (error) {
        console.log("ERROR 발생");
        console.log(error);
      });
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
      <div className="Video" top="520px">
        <div>Uploaded video : {sessionStorage.getItem("videoName")}</div>
      </div>
      <div className="Effect">
        <div>
          Processing effect :
          {sessionStorage.getItem("character") === "M" ? "Mozaic" : "Character"}
        </div>
      </div>

      <button onClick={() => makeFormData()}>asdsad</button>
    </div>
  );
}

export default Result;
