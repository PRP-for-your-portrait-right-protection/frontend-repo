import React from "react";
import "./Photo.css";
import ListButton from "../components/ListButton";
import ResearchListBlock from "components/ResearchListBlock";
import ImageListBlock from "components/ImageListBlock";

import PhotoLandingPage from "components/PhotoLandingPage";
function Photo() {
  return (
    <div>
      <ListButton></ListButton>
      <div className="gridWrap">
        <div className="font2">PHOTO</div>
      </div>
      {/*<PhotoLandingPage />*/}
      <ImageListBlock></ImageListBlock>
    </div>
  );
}

export default Photo;
//<BasicButton></BasicButton>
/*<button //ImgList추가 버튼
            className="addBtn"
            onClick={() => addImgList(null)}
          >
            <HiUserAdd
              size="50"
              flex-direction="row"
              justify-content="center"
              place-content="center"
            />
          </button> */
