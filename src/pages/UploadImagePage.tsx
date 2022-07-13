import React from "react";
import Title from "components/Title";
import Button from "components/Button";
import ImageList from "components/ImageList";

function UploadImagePage() {
  return (
    <>
      <Title textValue="Select portraits without mosaic"></Title>
      <ImageList name="you"></ImageList>
      <div className="absolute bottom-0 right-0 p-5">
        <Button img="imges/rightArrow.png" url="/"></Button>
      </div>
      <div className="absolute bottom-0 left-0 p-5">
        <Button img="imges/leftArrow.png" url="/"></Button>
      </div>
    </>
  );
}

export default UploadImagePage;
