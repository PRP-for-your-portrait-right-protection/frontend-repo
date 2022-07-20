import React, { useState } from "react";
import PropTypes from "prop-types";
const VideoList = ({ videos }) => {
  console.log(JSON.stringify(videos));
  return (
    <div>
      {videos &&
        videos.map((video) => {
          console.log(video);
        })}
    </div>
  );
};

export default VideoList;

VideoList.propTypes = {
  videos: PropTypes.array,
};
