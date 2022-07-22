import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const VideoPost = ({ videos, loading }) => {
  if (loading) {
    return (
      <Background>
        <img
          src="images\Spinner-1s-200px.gif"
          alt="로딩중"
          width="10%"
          background-color="transparent"
        />
      </Background>
    );
  }
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-y-4 w-8/12 mx-64 mt-10">
      {videos.file &&
        videos.file.map((item) => {
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

export const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: transparent;
  z-index: -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
