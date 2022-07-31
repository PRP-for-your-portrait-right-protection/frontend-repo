import React, { useEffect, useState, version } from "react";
import axios from "../api/axios";
import VideoPost from "./VideoPost";
import "rc-pagination/assets/index.css";
import Pagination from "./Pagination";
import Load from "./Load";
import WaitVideos from "../components/WaitVideos";

function LandingPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage, setVideosPerPage] = useState(4); //페이지당 원하는개수

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios
        .get(`/processed-videos`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then(function (response) {
          console.log("결과값은?");
          console.log(response);
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
    axios
      .delete(`/processed-videos/${videoId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then(function (response) {
        setLoading(true);
      })
      .catch(function (error) {
        console.log(error);
      });

    setVideos(videos.filter((video) => video.id !== videoId));
    if (videos.length % (videosPerPage + 1) == 0) {
      //페이지 삭제 예외처리
      setCurrentPage((currentPage) => currentPage - 1);
      console.log("aaaaaa");
    }
    console.log(videos);
  };

  return (
    <div>
      <WaitVideos />
      {loading ? (
        <>
          {videos ? (
            <>
              <VideoPost
                videos={currentVideos(videos)}
                deleteFuc={deleteVideo}
              />
              <Pagination
                componentsPerPage={videosPerPage}
                totalComponents={videos.length}
                paginate={setCurrentPage}
              />
            </>
          ) : null}
        </>
      ) : (
        <Load />
      )}
    </div>
  );
}

export default LandingPage;
