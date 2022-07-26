import React, { useEffect } from "react";
import "./Result.css";
import Title from "components/Title";
import ButtonSession from "../components/ButtonSession";
import WaitVideos from "components/WaitVideos";

function Result() {
  useEffect(() => {
    if (sessionStorage.getItem("task") == null) {
      sessionStorage.setItem("task", JSON.stringify([]));
    }
  }, []);

  const makeFormData = () => {
    // let temp = JSON.parse(sessionStorage.getItem("task"));
    // temp.push("add" + Math.random());
    // sessionStorage.setItem("task", JSON.stringify(temp));

    const formData = new FormData();
    let faceType =
      sessionStorage.getItem("character") === "M" ? "mosaic" : "character";
    formData.append("faceType", faceType);

    if (faceType === "character") {
      formData.append(
        "block_character_url",
        JSON.parse(sessionStorage.getItem("character"))
      );
    }

    formData.append(
      "whitelist_face_image_id",
      JSON.parse(sessionStorage.getItem("images"))
    );

    formData.append("video_url", JSON.parse(sessionStorage.getItem("video")));
    axios({
      method: "post",
      url: `https://d601a5df-dc71-481f-9ca6-f2d053dd56e7.mock.pstmn.io/video`,
      formData,
      headers: { Authorization: "Bearer " + localStorage.token },
    })
      .then(function (response) {
        console.log(response.data.celeryId);
        let temp = JSON.parse(sessionStorage.getItem("task"));
        temp.push(response.data.celeryId);
        sessionStorage.setItem("task", JSON.stringify(temp));
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

      <div className="Pictures" top="403px">
        <div>
          Uploaded pictures :
          {/* {+JSON.parse(sessionStorage.getItem("images")).length} */}
        </div>
      </div>
      <div className="Video" top="520px">
        <div>
          Uploaded video :{" "}
          {JSON.parse(sessionStorage.getItem("test")).videoName}
        </div>
      </div>
      <div className="Effect">
        <div>
          Processing effect :
          {sessionStorage.getItem("character") === "M" ? "Mozaic" : "Character"}
        </div>
      </div>

      <button onClick={() => makeFormData()}>asdsad</button>
      <WaitVideos />
    </div>
  );
}

export default Result;
