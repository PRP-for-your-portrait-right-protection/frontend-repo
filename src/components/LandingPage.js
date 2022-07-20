import React, { useEffect, useState } from "react";
//import { FaCode } from "react-icons/fa";
//import { Card, Avatar, Col, Row } from "antd";
import Col from "@ant-design/icons";
import Row from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import VideoList from "components/VideoList";
//const { Meta } = Card;
function LandingPage() {
  const [videos, setVideos] = useState([]);
  // 랜딩 페이지에서 서버에 있는 비디오 가져오기 위한 axios 통신 보내기
  useEffect(() => {
    const TestApiCall = async () => {
      try {
        const response = await axios.get(
          "https://23c181be-a198-4822-99f7-4003280da2a7.mock.pstmn.io/mock-api/user/video"
        );
        setVideos(response.data);
      } catch (err) {
        console.log("Error >>", err);
      }
    };
    TestApiCall();
  }, []);

  //비디오를 맵으로 묶기  lg={6} md={8} xs={24}
  //  /*  const renderCards = Video.file.map((video) => {
  //     <Col key={video.id}>
  //       {/*하나의 동영상에 해당하는 페이지로 이동
  //       lg: 가장 클때 6그리드 사용,
  //       md: 중간 크기일 때 8그리드 사용,
  //       xs: 가장 작은 크기인 경우 24그리드 사용 */}
  //       {/* <div style={{ position: "relative" }}>
  //         <a href={`/video/${video._id}`}></a>
  //         <img
  //           style={{ width: "100%" }}
  //           src="{`http://localhost:3000/${video.thumbnail}"
  //           alt="thumbnail"
  //         /> */}
  //     </Col>;
  //   }); */

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      {videos.map((video) => {
        console.log(video);
      })}
    </div>
  );
}

export default LandingPage;
