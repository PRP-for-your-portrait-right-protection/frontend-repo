import React, { useEffect } from "react";
import "./Result.css";
import Title from "../components/Title";
import ButtonSession from "../components/ButtonSession";
import ResultImageList from "../components/ResultImageList";
import axios from "../api/axios";
import { useStore } from "../components/store";
import "../components/Step.css";
import { AiOutlineCheck } from "react-icons/ai";
import Load from "../components/Load";

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
      <Title
        textValue="Selected Result"
        textTooltip="Please check the result selected earlier."
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
      {video ? (
        <>
          {" "}
          <div className="fixed bottom-0 right-0 p-5">
            <ButtonSession
              img="images/right.png"
              url="/video"
              text="next"
              saveFuc={makeFormData}
            ></ButtonSession>
          </div>
          <div className="fixed bottom-0 left-0 p-5">
            <ButtonSession
              img="images/left.png"
              url="/Mosaic"
              text="previous"
              saveFuc={null}
            ></ButtonSession>
          </div>
          <div className="wrapResult">
            <ul className="result">
              <li>
                <div>WhiteList Number : {faceId.length}</div>
              </li>
              <li>
                <ResultImageList object={faceId} />
              </li>

              <li>
                <div>
                  <p className="w-96 truncate">
                    Uploaded video : {video.videoName}{" "}
                  </p>
                  <div className="flex justify-center items-center w-7/12 border-4 rounded-lg border-sky-600">
                    <video
                      className="flex w-full h-full"
                      id="video"
                      src={video.url}
                      style={{ margin: "auto" }}
                      controls
                    ></video>
                  </div>
                </div>
              </li>
              {character === "M" ? (
                <li className="pb-10">
                  <div>Processing effect : {"Mosaic"}</div>
                </li>
              ) : (
                <li className="pb-10">
                  <div>
                    Processing effect : {"Character"}
                    <div className=" w-48">
                      <img
                        className="h-40 w-40 border-4 rounded-2xl border-sky-600"
                        alt="sample"
                        src={character.url}
                      />
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </div>{" "}
        </>
      ) : (
        <Load />
      )}
    </div>
  );
}

export default Result;
