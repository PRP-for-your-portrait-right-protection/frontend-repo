import React from "react";
import "./Photo.css";
import ListButton from "../components/ListButton";
import ResearchListBlock from "components/ResearchListBlock";
import Button from "components/Button";
import UserPageImageListBlock from "components/UserPageImageListBlock";

import PhotoLandingPage from "components/PhotoLandingPage";
function Photo() {
  return (
    <ul>
      <ListButton></ListButton>
      <div className="gridWrap">
        <div className="font1">PHOTO</div>
      </div>
      <UserPageImageListBlock></UserPageImageListBlock>
    </ul>
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
