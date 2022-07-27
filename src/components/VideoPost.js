import React from "react";
import PropTypes from "prop-types";
import "./VideoPost.css";
import axios from "axios";
const VideoPost = ({ videos }) => {
  const useConfirm = (message = null, onConfirm, onCancel) => {
    if (!onConfirm || typeof onConfirm !== "function") {
      retrun;
    }
    if (onCancel && typeof onCancel !== "function") {
      return;
    }
    const confirmAction = () => {
      if (window.confirm(message)) {
        onConfirm();
      } else {
        onCancel();
      }
    };
    return confirmAction;
  };
  const deleteConfirm = () => {
    async () => {
      try {
        const res = await axios.delete(
          "https://23c181be-a198-4822-99f7-4003280da2a7.mock.pstmn.io/mock-api/user/video"
        );
        console.log(res);
      } catch (error) {
        //응답 실패
        console.error(error);
      }
    };
  };

  const cancelConfirm = () => console.log("취소했습니다.");

  const confirmDelete = useConfirm(
    "Are you sure you want to delete it?",
    deleteConfirm,
    cancelConfirm
  );

  return (
    <div className="wrap">
      <div className="grid grid-cols-2 grid-rows-2 w-8/12 place-items-center content-center mt-5">
        {videos &&
          videos.map((item) => {
            return (
              <>
                <div className="card">
                  <video
                    className="w-11/12 h-68"
                    id="video"
                    src={item}
                    style={{ margin: "auto" }}
                    controls
                  ></video>
                  <button
                    className="w-20 h-10 button button--ujarak button--border-medium button--round-s button--text-thick"
                    onClick={confirmDelete}
                  >
                    Delete
                  </button>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default VideoPost;

VideoPost.propTypes = {
  videos: PropTypes.any,
  loading: PropTypes.any,
};
