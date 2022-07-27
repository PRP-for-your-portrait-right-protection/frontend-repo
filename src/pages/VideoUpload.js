import React, { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
import "./VideoUpload.css";
import ButtonSession from "../components/ButtonSession";
import Title from "components/Title";
function VideoUpload() {
  const fileInput = useRef(); // 외부 이미지 클릭 시  <input>가 눌리도록 설정하기 위한 변수
  const [fileVideo, setFileVideo] = useState(); //화면에 보여 줄 비디오 오브젝트
  const [preFileVideo, setPreFileVideo] = useState(); //기존에 넣었던 데이터가 있는 지

  /**
   * @name : Teawon
   * @function :saveFile - 파일을 입력받아 화면에 보여줄 ObjectURL을 만드는 함수
   * @create-date: 2022-07-18
   * @update-date: 2020-07-21
   * - 새로 파일 업로드 시 , preFileVideo값을 null로 갱신로직 추가
   */
  const saveFile = (event) => {
    setPreFileVideo();
    setFileVideo(event.target.files[0]);
  };

  /**
   * @name : Teawon
   * @function :makeFormData - 입력한 동영상파일을 보낸 후 해당 url을 받아 세션에 저장하는 함수
   * @create-data: 2022-07-21
   */
  const makeFormData = () => {
    if (!preFileVideo) {
      //만약 기존에 저장된영상이 있다면 추가로 보내지 않는다.
      const formData = new FormData();
      formData.append("file", fileVideo);

      axios
        .post(`/origin-videos`, formData, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then(function (response) {
          console.log(response);

          let videoObject = {
            id: response.data.id,
            url: response.data.url,
            videoName: fileVideo.name,
          };
          sessionStorage.setItem("video", JSON.stringify(videoObject));
        })
        .catch(function (error) {
          console.log("ERROR 발생");
          console.log(error);
        });
    }
  };

  /**
   * @name : Teawon
   * @function :useEffect - 세션에 저장된 값이 있다면 (기존에 업로드한 영상이 있다면) 해당 값을 가져와서 사용한다
   * @create-data: 2022-07-21
   */
  useEffect(() => {
    if (sessionStorage.getItem("video") != null) {
      setPreFileVideo(JSON.parse(sessionStorage.getItem("video")).url);
    }
  }, []);

  return (
    <div>
      <div className="fixed bottom-0 right-0 p-5">
        <ButtonSession
          img="images/rightArrow.png"
          url="/Mosaic"
          saveFuc={makeFormData}
        ></ButtonSession>
      </div>
      <div className="fixed bottom-0 left-0 p-5">
        <ButtonSession
          img="images/leftArrow.png"
          url="/upload"
          saveFuc={null}
        ></ButtonSession>
      </div>

      <Title textValue="Please upload your video"></Title>
      <div className="wrapVideo">
        {preFileVideo ? ( //이전 값을 사용할 때는 별도의 파일을object로 바꾸지 않고 그대로 출력하기 위해 따로 if문으로 분리
          <div>
            <video
              className="flex items-center justify-center w-3/4 h-72"
              id="video"
              src={preFileVideo}
              style={{ margin: "auto" }}
              controls
            ></video>
            <span
              className="uploadButton flex justify-center"
              onClick={() => fileInput.current.click()}
            >
              <img src="images\videoupload.png" alt="" className="file" />
            </span>
          </div>
        ) : fileVideo ? ( //입력된 비디오파일이 있다면 드롭박스를 숨기고 파일업로드 버튼이 생기도록 함
          <div>
            <video
              className="w-3/4 h-64"
              id="video"
              src={window.URL.createObjectURL(fileVideo)}
              style={{ margin: "auto" }}
              controls
            ></video>
            <span
              className="uploadButton flex justify-center mt-6 "
              onClick={() => fileInput.current.click()}
            >
              <img src="images\videoupload.png" alt="" className="file" />
            </span>
          </div>
        ) : (
          <div className="flex cc items-center justify-center w-3/4 h-64 mt-9">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col justify-center items-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="mb-3 w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>

                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  MP4, AVI , WMV , MKV , MOV
                </p>
              </div>
              <input
                id="dropzone-file"
                className="cursor-pointer absolute block p-20 z-50 opacity-0"
                name="imageUpload"
                type="file"
                accept="video/*"
                onChange={saveFile}
              />
            </label>
          </div>
        )}
      </div>
      {}

      <input //uploadimage클릭 시 해당 input이 Click
        ref={fileInput}
        className="hidden"
        name="imageUpload"
        type="file"
        accept="video/*"
        onChange={saveFile}
      />

      <button onClick={() => makeFormData()}>asdsad</button>
    </div>
  );
}

export default VideoUpload;
