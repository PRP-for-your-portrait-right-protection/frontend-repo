import React from "react";
import "./PhotoPage.css";
import UserNavbar from "../components/UserNavbar";
import UserPageImageListBlock from "../components/white-list/UserPageImageListBlock";

function PhotoPage() {
  return (
    <ul>
      <UserNavbar></UserNavbar>
      <div className="gridWrap"></div>
      <UserPageImageListBlock></UserPageImageListBlock>
    </ul>
  );
}

export default PhotoPage;
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
