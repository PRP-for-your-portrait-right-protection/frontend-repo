import React from "react";
import "./WhiteListPage.css";
import UserNavbar from "../components/UserNavbar";
import UserPageImageListBlock from "../components/white-list/UserPageImageListBlock";

function WhiteListPage() {
  return (
    <ul>
      <UserNavbar></UserNavbar>
      <div className="gridWrap"></div>
      <UserPageImageListBlock></UserPageImageListBlock>
    </ul>
  );
}

export default WhiteListPage;
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
