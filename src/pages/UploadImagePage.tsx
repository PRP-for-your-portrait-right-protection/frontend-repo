import React from "react";
import Title from "components/Title";
import Button from "components/Button";
import ImageList from "components/ImageList";
import ImageListBlock from "components/ImageListBlock";
function UploadImagePage() {
  return (
    <>
      <Title textValue="Select portraits without mosaic"></Title>
      <ImageListBlock></ImageListBlock>
      {/* <div className="absolute bottom-0 right-0 p-5">
        <Button img="images/rightArrow.png" url="/VideoUpload"></Button>
      </div>
      <div className="fixed bottom-0 left-0 p-5">
        <Button img="images/leftArrow.png" url="/"></Button>
      </div> */}
    </>
  );
}

export default UploadImagePage;
