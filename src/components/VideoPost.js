import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const VideoPost = ({ videos }) => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-y-4 w-8/12 mx-64 mt-16">
      {videos &&
        videos.map((item) => {
          return (
            <>
              <video
                className="w-11/12 h-68"
                id="video"
                src={item}
                style={{ margin: "auto" }}
                controls
              ></video>
            </>
          );
        })}
    </div>
  );
};

export default VideoPost;

VideoPost.propTypes = {
  videos: PropTypes.any,
  loading: PropTypes.any,
};
