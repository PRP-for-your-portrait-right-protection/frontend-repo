import React from "react";
import "./VideoUpload.css";
import Button2 from "../components/Button2";
function VideoUpload() {
  return (
    <div>
      <Button2
        img="images\icons8-arrows-64 (2) 1.png"
        url="/upload"
        design="previous"
      ></Button2>
      <Button2
        img="images\icons8-arrows-64 (2) 2.png"
        url="/Mosaic"
        design="next"
      ></Button2>

      <div className="uploadFont">
        <div>Please upload your video</div>
      </div>
      <hr className="hr2" />
      <div>
        <span>
          <img src="images\videoupload.png" alt="" className="file" />
        </span>
        <span>
          <input id="formFileLg" type="file"></input>
        </span>
      </div>
    </div>
  );
}

export default VideoUpload;
