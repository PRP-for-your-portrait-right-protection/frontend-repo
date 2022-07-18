import React from "react";
import "./VideoUpload.css";
import Button from "components/Button";
import Title from "components/Title";
// import VideoChoice from "components/VideoChoice";
function VideoUpload() {
  return (
    <div>
      <div className="absolute bottom-0 right-0 p-5">
        <Button img="images/rightArrow.png" url="/Mosaic"></Button>
      </div>
      <div className="absolute bottom-0 left-0 p-5">
        <Button img="images/leftArrow.png" url="/upload"></Button>
      </div>

      <Title textValue="Please upload your video"></Title>
      {/* <VideoChoice></VideoChoice> */}
      <div>
        <span>
          <img src="images\videoupload.png" alt="" className="file" />
        </span>
        <span>
          <input id="formFileLg" type="file" accept="video/*"></input>
        </span>
      </div>
    </div>
  );
}

export default VideoUpload;
