import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoPost from "components/VideoPost";
import "rc-pagination/assets/index.css";
import Pagination from "components/Pagination";
const LandingPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage, setVideosPerPage] = useState(4); //페이지당 원하는개수

  // 랜딩 페이지에서 서버에 있는 비디오 가져오기 위한 axios 통신 보내기
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      const res = await axios.get(
        "https://23c181be-a198-4822-99f7-4003280da2a7.mock.pstmn.io/mock-api/user/video"
      );
      const length = res.data.length;
      setVideos(res.data);
      setLoading(false);
    };
    fetchVideos();
  }, []);
  console.log(length);

  //현재 동영상 가져오기
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = (videos) => {
    //let currentVideos = 0;
    currentVideos = videos[0].file.slice(indexOfFirstVideo, indexOfLastVideo);
    return currentVideos;
  };
  console.log(indexOfLastVideo);
  console.log(indexOfFirstVideo);
  console.log(currentVideos);
  console.log(videosPerPage);
  console.log(Object.values(videos).length);
  //페이지 변환
  //const paginate = (pageNumbers) => setCurrentPage(pageNumbers);

  return (
    <div className="container">
      <VideoPost videos={videos} loading={loading} />
      <Pagination videosPerPage={4} totalVideos={20} />
    </div>
  );
};

export default LandingPage;
