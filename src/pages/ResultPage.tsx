import React, { useEffect } from "react";
import "./ResultPage.css";
import Title from "../components/Title";
import ButtonSession from "../components/ButtonSession";
import ResultImageList from "../components/result/ResultImageList";
import axios from "../api/axios";
import { useSelectContentStore } from "../store/store";
import "../components/Step.css";
import { AiOutlineCheck } from "react-icons/ai";
import Load from "../components/Load";

function ResultPage() {
  const { faceId, video, character, task, setTask, removeAllData } =
    useSelectContentStore(); //zustand 전역변수

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
          token: JSON.parse(localStorage.getItem("token")).value,
        },
      })
      .then(function (response) {
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
        textTooltip="Please check the result."
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
        <div className="stepper-item active2">
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
              url="/user/video"
              text="next"
              saveFuc={makeFormData}
            ></ButtonSession>
          </div>
          <div className="fixed bottom-0 left-0 p-5">
            <ButtonSession
              img="images/left.png"
              url="/effect"
              text="previous"
              saveFuc={null}
            ></ButtonSession>
          </div>
          <ul className="result">
            <li
              className="flex flex-col justify-center resultBox mb-16"
              style={{ paddingTop: "15px" }}
            >
              <div className="t pt-3 text-slate-700 flex flex-col justify-center items-center">
                <div
                  className="line2 lineColor1"
                  style={{ marginRight: "17.5rem" }}
                ></div>
                <div className="flex flex-row">
                  <p className="pr-1">WhiteList Faces</p>
                  <p className="c peopleCnt">{faceId.length}</p>
                </div>
              </div>

              <div className="justify-center">
                <ResultImageList resultWhiteListFaces={faceId} />
              </div>
            </li>

            <li className="resultBox mb-16">
              {/* <hr
                style={{
                  border: "solid 2px #303038",
                  backgroundColor: "#303038",
                  width: "4rem",
                  paddingLeft: "3rem",
                }}
              /> */}

              {/* <li className="flex items-start">PRP</li> */}

              <li className="inline-flex justify-center pt-3">
                <div className="w-6/12 float-right">
                  <video
                    className="flex w-full h-full"
                    id="video"
                    src={video.url}
                    style={{ margin: "auto" }}
                    controls
                  ></video>
                </div>

                <div className="flex flex-col float-left pt-5">
                  <div className="line2 lineColor2 ml-10 mb-2"></div>
                  <p className="t w-96 truncate text-slate-700 pb-5 pl-10">
                    Uploaded video
                  </p>

                  <p className="c text-slate-500 text-base pl-10">
                    This is a video uploaded. <br></br>Please make sure the
                    video is correct. <br></br>If you do not want to continue,
                    <br></br>click the Previous button.
                  </p>
                </div>
              </li>
            </li>

            {character === "M" ? (
              <li className="resultBox mb-16">
                <li
                  className="inline-flex justify-center"
                  style={{ marginLeft: "4.7rem" }}
                >
                  <div className="flex flex-col float-left">
                    <div className="line2 lineColor3 mb-2"></div>
                    <p className="t text-slate-700 float-left">
                      Processing effect
                    </p>
                    <p className="c text-slate-600 text-2xl text-left pb-5">
                      {"Mosaic"}
                    </p>
                    <p className="c text-slate-500 text-base ">
                      Effect to be used for mosaic processing. <br></br>If the
                      selected effect is correct, <br />
                      please click the NEXT button.
                    </p>
                  </div>
                  <div className="w-80 float-right ml-56">
                    <img
                      className="h-48 w-48 border-10 rounded border-transparent justify-center"
                      alt="sample"
                      src="images/mo.jpg"
                    />
                  </div>
                </li>
              </li>
            ) : (
              <li className="resultBox mb-16">
                <li
                  className="inline-flex justify-center"
                  style={{ marginLeft: "4.7rem" }}
                >
                  <div className="flex flex-col float-left">
                    <div className="line2 lineColor3 mb-2  align-middle"></div>
                    <p className="t text-slate-700 float-left">
                      Processing effect
                    </p>
                    <p className="c text-slate-600 text-2xl text-left pb-5">
                      {"Character"}
                    </p>
                    <p className="c text-slate-500 text-base ">
                      Effect to be used for mosaic processing. <br></br>If the
                      selected effect is correct, please press NEXT button.
                    </p>
                  </div>

                  <div className="w-80 float-right ml-56">
                    <img
                      className="h-48 w-48 object-cover border-10 rounded border-transparent justify-center"
                      alt="sample"
                      src={character.url}
                    />
                  </div>
                </li>
              </li>
            )}
          </ul>
        </>
      ) : (
        <Load />
      )}
    </div>
  );
}

export default ResultPage;
