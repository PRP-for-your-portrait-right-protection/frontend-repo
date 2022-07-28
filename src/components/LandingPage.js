import React, { useEffect, useState, version } from "react";
import axios from "../api/axios";
import VideoPost from "components/VideoPost";
import "rc-pagination/assets/index.css";
import Pagination from "components/Pagination";
import Load from "components/Load";

function LandingPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage, setVideosPerPage] = useState(4); //페이지당 원하는개수

  // 랜딩 페이지에서 서버에 있는 비디오 가져오기 위한 axios 통신 보내기
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios
        .get(`/processed-videos`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then(function (response) {
          setVideos(response.data.data);
          setLoading(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    fetchData();
  }, []);

  //현재 동영상 가져오기
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;

  const currentVideos = (video) => {
    console.log(video);
    return video.slice(indexOfFirstVideo, indexOfLastVideo);
  };

  const deleteVideo = (videoId) => {
    setVideos(videos.filter((video) => video.id !== videoId));
    setCurrentPage(1);
    axios
      .delete(`/processed-videos/${videoId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then(function (response) {
        setVideos(response.data.data);
        setLoading(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      {loading ? (
        <>
          <VideoPost videos={currentVideos(videos)} deleteFuc={deleteVideo} />
          <Pagination
            videosPerPage={videosPerPage}
            totalVideos={videos.length}
            paginate={setCurrentPage}
          />
        </>
      ) : (
        <Load />
      )}
    </div>
  );
}

export default LandingPage;
