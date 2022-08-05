import React, { useEffect, useState, version } from "react";
import axios from "../api/axios";
import VideoPost from "./VideoPost";
import "rc-pagination/assets/index.css";
import Pagination from "react-js-pagination";
import Load from "./Load";
import WaitVideos from "../components/WaitVideos";

function LandingPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage, setVideosPerPage] = useState(4); //페이지당 원하는개수

  /**
   * @name : Sunghyun
   * @Function : 로컬 스토리지에서 특정 키에 저장된 value와 Expire(만료 시간)을 가져와 만료시간에 따라서 값을 null 또는 value 를 가져온다.
   * @create-date: 2022-08-01
   * @update-date: 2022-08-01
   */

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios
        .get(`/processed-videos`, {
          headers: {
            token: JSON.parse(localStorage.getItem("token")).value,
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
    return video.slice(indexOfFirstVideo, indexOfLastVideo);
  };

  const deleteVideo = (videoId) => {
    axios
      .delete(`/processed-videos/${videoId}`, {
        headers: {
          token: JSON.parse(localStorage.getItem("token")).value,
        },
      })
      .then(function (response) {
        setLoading(true);
      })
      .catch(function (error) {
        console.log(error);
      });

    setVideos(videos.filter((video) => video.id !== videoId));
    if ((videos.length - 1) % videosPerPage == 0 && currentPage != 1) {
      //페이지 삭제 예외처리
      setCurrentPage((currentPage) => currentPage - 1);
    }
  };

  return (
    <div>
      <WaitVideos />
      {loading ? (
        <>
          {videos == [] ? (
            <>
              <VideoPost
                videos={currentVideos(videos)}
                deleteFuc={deleteVideo}
              />

              <Pagination
                itemsCountPerPage={videosPerPage}
                totalItemsCount={videos.length}
                onChange={setCurrentPage}
                activePage={currentPage}
                pageRangeDisplayed={5}
                prevPageText={"‹"}
                nextPageText={"›"}
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
