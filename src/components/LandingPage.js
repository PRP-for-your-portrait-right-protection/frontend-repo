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

  /**
   * @name : Sunghyun
   * @Function : 로컬 스토리지에서 특정 키에 저장된 value와 Expire(만료 시간)을 가져와 만료시간에 따라서 값을 null 또는 value 를 가져온다.
   * @create-date: 2022-08-01
   * @update-date: 2022-08-01
   */
  const getItemWithExpireTime = (keyName) => {
    const objString = localStorage.getItem(keyName);

    if (!objString) {
      return null;
    }

    const obj = JSON.parse(objString);

    if (Date.now() > obj.expire) {
      localStorage.removeItem(keyName);

      return null;
    }

    return obj.value;
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios
        .get(`/processed-videos`, {
          headers: {
            token: getItemWithExpireTime("token"),
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
          token: getItemWithExpireTime("token"),
        },
      })
      .then(function (response) {
        setLoading(true);
      })
      .catch(function (error) {
        console.log(error);
      });

    setVideos(videos.filter((video) => video.id !== videoId));
    if (videos.length % (videosPerPage + 1) == 0 && currentPage != 1) {
      //페이지 삭제 예외처리
      setCurrentPage((currentPage) => currentPage - 1);
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
