import React, { useEffect } from "react";
import "./Result.css";
import Title from "components/Title";
import ButtonSession from "../components/ButtonSession";
import ResultImageList from "../components/ResultImageList";
import axios from "../api/axios";
import { useStore } from "../components/store";
import "../components/Step.css";
import { AiOutlineCheck } from "react-icons/ai";

function Result() {
  const { faceId, video, character, task, setTask, removeAllData } = useStore(); //zustand 전역변수

  const makeFormData = () => {
    const formData = new FormData();
    let faceType = character === "M" ? "mosaic" : "character";
    formData.append("face_type", faceType);

    if (faceType === "character") {
      formData.append("block_character_id", character.id);
    }

    faceId.map((data) => {
      formData.append("whitelist_face_id", data.id);
    });

    formData.append("video_id", video.id);

    axios
      .post(`/processed-videos`, formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then(function (response) {
        console.log(response);
        let temp = task;
        temp.push(response.data.id);
        setTask(temp);
        removeAllData();
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
      <button onClick={makeFormData}>dadaddssadasdasdsad</button>
      <Title
        textValue="Selected Result"
        textTooltip="After selecting the target to be excluded from the mosaic, please upload the face image of the person."
      ></Title>

      <div className="stepper-wrapper">
        <div className="stepper-item completed">
          <div className="step-counter">
            <AiOutlineCheck size="20" color="white" />
          </div>
          <div className="step-name">Whitelist Picture</div>
        </div>
        <div className="stepper-item completed">
          <div className="step-counter">
            <AiOutlineCheck size="20" color="white" />
          </div>
          <div className="step-name">Video</div>
        </div>
        <div className="stepper-item completed">
          <div className="step-counter">
            <AiOutlineCheck size="20" color="white" />
          </div>
          <div className="step-name">Effect</div>
        </div>
        <div className="stepper-item active">
          <div className="step-counter">4</div>
          <div className="step-name">Result</div>
        </div>
      </div>
      <div className="wrapResult">
        <ul className="result">
          <li>
            <div>WhiteList Number :{faceId.length}</div>
          </li>
          <ResultImageList object={faceId} />
          <li>
            <div className="mt-10">
              <p className="w-96 truncate">
                Uploaded video : {video.videoName}{" "}
              </p>
              <video
                className="flex items-center justify-center w-3/4 h-72"
                id="video"
                src={video.url}
                style={{ margin: "auto" }}
                controls
              ></video>
            </div>
          </li>
          {character === "M" ? (
            <li>
              <div>Processing effect :{"Mosaic"}</div>
            </li>
          ) : (
            <li>
              <div>
                Processing effect :{"Character"}
                <img className="h-40 w-40" alt="sample" src={character.url} />
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Result;
