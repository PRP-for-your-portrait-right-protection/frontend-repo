import React from "react";
import Title from "../components/Title";
import ImageListBlock from "../components/ImageListBlock";
import "../components/Step.css";

function UploadImagePage() {
  return (
    <>
      <Title
        // textValue="Select portraits without mosaic"
        textValue="Select WhiteList"
        textTooltip="After selecting the target to be excluded from the mosaic, please upload the face image of the person."
      ></Title>

      <div className="stepper-wrapper">
        <div className="stepper-item active2">
          <div className="step-counter">1</div>
          <div className="step-name">Whitelist Faces</div>
        </div>
        <div className="stepper-item ">
          <div className="step-counter">2</div>
          <div className="step-name">Video</div>
        </div>
        <div className="stepper-item ">
          <div className="step-counter">3</div>
          <div className="step-name">Effect</div>
        </div>
        <div className="stepper-item">
          <div className="step-counter">4</div>
          <div className="step-name">Result</div>
        </div>
      </div>
      <ImageListBlock></ImageListBlock>
    </>
  );
}

export default UploadImagePage;
