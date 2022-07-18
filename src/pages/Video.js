import React from "react";
import "./Video.css";
import ListButton from "../components/ListButton";
import Button from "components/Button";
import ResearchListBlock from "components/ResearchListBlock";
function Video() {
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
      <div className="font1">VIDEO</div>
      <ResearchListBlock></ResearchListBlock>
    </div>
  );
}

export default Video;
