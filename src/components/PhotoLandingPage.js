import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ImgBlock from "components/ImageBlock";
const PhotoLandingPage = () => {
  const [photos, setPhotos] = useState([]);
  // 랜딩 페이지에서 서버에 있는 사진 가져오기 위한 axios 통신 보내기
  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const res = await axios.get(
          "https://180a3a16-434e-444a-8c06-64524457d92b.mock.pstmn.io//mock-api/photo"
        );
        setPhotos(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPhoto();
  }, []);

  return (
    <div>
      {photos.file &&
        photos.file.map((item) => {
          return (
            <>
              <img
                style={{ width: "100%", height: "100%" }}
                alt="photo"
                src={item}
              />
            </>
          );
        })}
    </div>
  );
};

export default PhotoLandingPage;
