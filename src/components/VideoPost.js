import React from "react";
import PropTypes from "prop-types";
import "./VideoPost.css";
import axios from "axios";
const VideoPost = ({ videos, deleteFuc }) => {
  const useConfirm = (message = null, onConfirm, onCancel, videoId) => {
    if (!onConfirm || typeof onConfirm !== "function") {
      retrun;
    }
    if (onCancel && typeof onCancel !== "function") {
      return;
    }

    const confirmAction = () => {
      if (window.confirm(message)) {
        onConfirm(videoId);
      } else {
        onCancel();
      }
    };
    confirmAction();
  };
  const deleteConfirm = (videoId) => {
    deleteFuc(videoId);
  };

  const cancelConfirm = () => console.log("취소했습니다.");

  const confirmDelete = (videoId) => {
    useConfirm(
      "Are you sure you want to delete it?",
      deleteConfirm,
      cancelConfirm,
      videoId
    );
  };
  return (
    <div className="wrap">
      <div className="grid grid-cols-2 grid-rows-2 w-8/12 place-items-center content-center mt-5">
        {videos &&
          videos.map((item) => (
            <div className="card" key={item.id}>
              <video
                className="w-11/12 h-68"
                id="video"
                src={item.url}
                style={{ margin: "auto" }}
                controls
              ></video>
              <button
                className="w-20 h-10 button button--ujarak button--border-medium button--round-s button--text-thick"
                onClick={() => confirmDelete(item.id)}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default VideoPost;

VideoPost.propTypes = {
  videos: PropTypes.any,
  loading: PropTypes.any,
  deleteFuc: PropTypes.any,
};
