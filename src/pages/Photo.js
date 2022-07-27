import React from "react";
import "./Photo.css";
import ListButton from "../components/ListButton";
import ResearchListBlock from "components/ResearchListBlock";
import Button from "components/Button";
import UserPageImageListBlock from "components/UserPageImageListBlock";

import PhotoLandingPage from "components/PhotoLandingPage";
function Photo() {
  return (
    <div>
      <ListButton></ListButton>
      <div className="gridWrap">
        <div className="font2">PHOTO</div>
      </div>
      <div className="absolute top-0 right-20 p-5 w-24 h-16">
        <img src="images\admin.png" alt="userName" />
      </div>
      <div className="absolute top-0 right-0 p-5 w-28 h-16">
        <Button img="images\signout.png" url="/"></Button>
      </div>

      <ListButton></ListButton>
      <div className="font2">PHOTO</div>
      <UserPageImageListBlock></UserPageImageListBlock>
      {/*<PhotoLandingPage />*/}
      {/* <ImageListBlock></ImageListBlock> */}
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
