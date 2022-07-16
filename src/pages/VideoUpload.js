import React, { useRef, useState } from "react";
import "./VideoUpload.css";
import Button from "components/Button";
import Title from "components/Title";
// import VideoChoice from "components/VideoChoice";
function VideoUpload() {
  const fileInput = useRef();
  const [fileVideo, setFileVideo] = useState("");

  const saveFile = (event) => {
    setFileVideo(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div>
      <div className="absolute bottom-0 right-0 p-5">
        <Button img="images/rightArrow.png" url="/Mosaic"></Button>
      <span className="uploadButton" onClick={() => fileInput.current.click()}>
        <img
          alt=""
          src="images\videoupload.png"
          className="file"
        />
          htmlFor="formFileLg"

      </span>
      <div className="m-0 flex justify-center items-center w-3/4">
        <label
          className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          htmlFor="dropzone-file"
        >
          <div className="flex flex-col justify-center items-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              className="mb-3 w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              <path
            >
                strokeLinecap="round"
                strokeWidth="2"
                strokeLinejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"

            </svg>
              ></path>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              drop
              <span className="font-semibold">Click to upload</span> or drag and
            </p>
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            <p className="text-xs text-gray-500 dark:text-gray-400">
          </div>
            </p>
          <input
            id="dropzone-file"
            ref={fileInput}
            className="cursor-pointer absolute block  p-20 z-50 opacity-0"
            type="file"
            name="imageUpload"
            onChange={saveFile}
          />
        </label>
      </div>
      <div className="absolute bottom-0 left-0 p-5">
        <Button img="images/leftArrow.png" url="/upload"></Button>
      </div>

      <Title textValue="Please upload your video"></Title>
      {/* <VideoChoice></VideoChoice> */}

      <div>
        {fileVideo && (
          <img alt="sample" src={fileVideo} style={{ margin: "auto" }} />
        )}
      </div>
    </div>
  );
}

export default VideoUpload;
