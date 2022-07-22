import React from "react";
import "./Photo.css";
import ListButton from "../components/ListButton";
import ResearchListBlock from "components/ResearchListBlock";
import Button from "components/Button";

import PhotoLandingPage from "components/PhotoLandingPage";
function Photo() {
  return (
    <div>
      <div className="absolute top-0 left-0 p-5 w-24 h-24">
        <Button img="images\iconoir_home.png" url="/main"></Button>
      </div>
      <div className="absolute top-0 right-20 p-5 w-24 h-16">
        <img src="images\admin.png" alt="userName" />
      </div>
      <div className="absolute top-0 right-0 p-5 w-28 h-16">
        <Button img="images\signout.png" url="/"></Button>
      </div>

      <ListButton></ListButton>
      <div className="font2">PHOTO</div>
      <ResearchListBlock></ResearchListBlock>
      {/*<PhotoLandingPage />*/}
    </div>
  );
}

export default Photo;
//<BasicButton></BasicButton>
