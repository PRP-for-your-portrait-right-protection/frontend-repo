import React, { useRef, useState } from "react";
import "./VideoUpload.css";
import Button from "components/Button";
import Title from "components/Title";
// import VideoChoice from "components/VideoChoice";
function VideoUpload() {
  const fileInput = useRef(); // 외부 이미지 클릭 시  <input>가 눌리도록 설정하기 위한 변수
  const [fileVideo, setFileVideo] = useState(""); //화면에 보여 줄 비디오 오브젝트

  /**
   * @name : Teawon
   * @function :saveFile - 파일을 입력받아 화면에 보여줄 ObjectURL을 만드는 함수
   * @create-data: 2022-07-18
   */
  const saveFile = (event) => {
    setFileVideo(window.URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div>
      <div className="absolute bottom-0 right-0 p-5">
        <Button img="images/rightArrow.png" url="/Mosaic"></Button>
      </div>
      <div className="absolute bottom-0 left-0 p-5">
        <Button img="images/leftArrow.png" url="/upload"></Button>
      </div>

      <Title textValue="Please upload your video"></Title>

      {fileVideo ? ( //입력된 비디오파일이 있다면 드롭박스를 숨기고 파일업로드 버튼이 생기도록 함
        <div>
          <video
            className="w-3/4 h-64"
            id="video"
            src={fileVideo}
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
      ) : (
        <div className="flex cc justify-center w-3/4 h-64 ">
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
              className="cursor-pointer absolute block  p-20 z-50 opacity-0"
              name="imageUpload"
              type="file"
              accept="video/*"
              onChange={saveFile}
            />
          </label>
        </div>
      )}

      <input //uploadimage클릭 시 해당 input이 Click
        ref={fileInput}
        className="hidden"
        name="imageUpload"
        type="file"
        accept="video/*"
        onChange={saveFile}
      />
    </div>
  );
}

export default VideoUpload;
