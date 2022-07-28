import React, { useEffect } from "react";
import "./Result.css";
import Title from "components/Title";
import ButtonSession from "../components/ButtonSession";
import axios from "../api/axios";

function Result() {
  useEffect(() => {
    if (sessionStorage.getItem("task") == null) {
      sessionStorage.setItem("task", JSON.stringify([]));
    }
  }, []);

  const makeFormData = () => {
    const formData = new FormData();
    let faceType =
      sessionStorage.getItem("character") === "M" ? "mosaic" : "character";
    formData.append("face_type", faceType);
    console.log(faceType);

    if (faceType === "character") {
      formData.append(
        "block_character_id",
        sessionStorage.getItem("character")
      );
    }

    JSON.parse(sessionStorage.getItem("faceId")).map((id) => {
      console.log(id);
      formData.append("whitelist_face_id", id);
    });

    console.log(JSON.parse(sessionStorage.getItem("faceId")));

    formData.append("video_id", JSON.parse(sessionStorage.getItem("video")).id);

    console.log(JSON.parse(sessionStorage.getItem("video")).id);
    axios
      .post(`/processed-videos`, formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then(function (response) {
        console.log(response.data);
        let temp = JSON.parse(sessionStorage.getItem("task"));
        temp.push(response.data.id);
        sessionStorage.setItem("task", JSON.stringify(temp));
      })
      .catch(function (error) {
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
      <button onClick={makeFormData}>ad</button>
      <div className="wrapResult">
        <ul className="result">
          <li>
            <div>
              WhiteList Number :
              {JSON.parse(sessionStorage.getItem("faceId")).length}
            </div>
          </li>
          <li>
            <div>
              Uploaded video :{" "}
              {JSON.parse(sessionStorage.getItem("video")).videoName}
            </div>
          </li>
          <li>
            <div>
              Processing effect :
              {sessionStorage.getItem("character") === "M"
                ? "Mosaic"
                : "Character"}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Result;
