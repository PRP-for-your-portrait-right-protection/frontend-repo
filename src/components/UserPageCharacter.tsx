import React, { useState, useRef, useEffect } from "react";
import axios from "../api/axios";
import styled from "styled-components";
import UserPageCharacterImageList from "../components/UserPageCharacterImageList";
//import Pagination from "../components/Pagination";
import Pagination from "react-js-pagination";
function UserPageCharacter() {
  const [userCharacterList, setUserCharacterList] = useState([]); // 사용자 캐릭터 이미지
  const [currentPage, setCurrentPage] = useState(1);
  const [characterPerPage, setCharacterPerPage] = useState(7); //페이지당 원하는개수
  const indexOfLastVideo = currentPage * characterPerPage;
  const indexOfFirstVideo = indexOfLastVideo - characterPerPage;

  /**
   * @name : Teawon
   * @function :useEffect - 캐릭터의 사진 및 사용자 캐릭터를 가져와 리스트에 설정
   * 만약 세션에 이전에 선택했던 정보가 들어있다면 selectedData에 값을 설정하여 복구
   * @create-date: 2022-07-22
   * @update-date: 2022-07-27
   * - api연결 및 구조 변경
   *
   */
  useEffect(() => {
    const fetchData = async () => {
      const resultUser = await axios
        .get(`block-characters/user`, {
          headers: {
            token: JSON.parse(localStorage.getItem("token")).value,
          },
        })
        .then(function (response) {
          setUserCharacterList(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    fetchData();
  }, []);

  /**
   * @name : Teawon
   * @function :makeFormData - 다음 페이지로 넘어갈 때 보내는 api정보
   * @create-date: 2022-07-22
   * @update-date :2022-07-24
   * - 파일의 선택여부에 따라 백엔드로 파일객체값을 두 필드값으로 분리하여 보냄
   * - 응답값을 받아 session에 저장
   */

  /**
   * @name : Teawon
   * @function :clickedToggleM(C) - 각 버튼이 눌리면 자신의 Toggle값을 활성화 및 상대방 활성화를 False
   * @create-data: 2022-07-18
   * @개선사항 : 향후 Radio버튼으로 변경하여 코드의 가독성을 높일 필요가 있을 것 같습니다.
   */

  /**
   * @name : Teawon
   * @function :addImgList - 사용자가 새로 추가한 캐릭터 이미지를 저장하는 함수
   * @create-data: 2022-07-22
   *
   */

  const currentCharacters = (characterImg) => {
    let currentPosts = [];
    let reverse = [...characterImg].reverse();

    return reverse.slice(indexOfFirstVideo, indexOfLastVideo);
  };

  const deleteImgList = (imgId) => {
    setUserCharacterList(
      userCharacterList.filter((characterImg) => characterImg.id !== imgId)
    );
    if (
      (userCharacterList.length - 1) % characterPerPage == 0 &&
      currentPage != 1
    ) {
      //페이지 삭제 예외처리
      setCurrentPage((currentPage) => currentPage - 1);
    }
    axios
      .delete(`/block-characters/user/${imgId}`, {
        headers: {
          token: JSON.parse(localStorage.getItem("token")).value,
        },
      })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };

  const addImgList = (insertData) => {
    const formData = new FormData();
    formData.append("file", insertData);

    axios
      .post(`/block-characters/user`, formData, {
        headers: {
          token: JSON.parse(localStorage.getItem("token")).value,
        },
      })
      .then(function (response) {
        let tempAxiosData = {
          id: response.data.id,
          url: URL.createObjectURL(insertData),
        };
        setUserCharacterList([...userCharacterList, tempAxiosData]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <UserPageCharacterImageList
        userCharacterList={currentCharacters(userCharacterList)}
        insertFuc={addImgList}
        deleteFuc={deleteImgList}
      ></UserPageCharacterImageList>
      <Pagination
        itemsCountPerPage={characterPerPage}
        totalItemsCount={userCharacterList.length}
        onChange={setCurrentPage}
        activePage={currentPage}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
      />
    </div>
  );
}

export default UserPageCharacter;
const ToggleBtn = styled.button`
  display: flex;
  width: 15vw;
  height: 22vh;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) =>
    !props.toggle ? "transparent" : "rgb(231, 179, 35)"};
  transition: all 0.3s ease-in-out; /* 부드러운 모션을 위해 추가*/
  &:hover {
    transform: scale(1.2);
    -webkit-transform: scale(1.2);
    -moz-transform: scale(1.2);
    -ms-transform: scale(1.2);
    -o-transform: scale(1.2);
  }
`;
