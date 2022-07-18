import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import "./Navigation.css";

/**
 * @name : minji
 * @component :Navigation - 조회 기능 부분에서 페이지 이동 시 현재 위치 확인
 * @create-data: 2022-07-15
 */

function Navigation({ url, name }) {
  return (
    <NavLink to={`/${url}`} className="navButton" activeclassname="active">
      {name}
    </NavLink>
  );
}
// Link: 경로 이동
// NavLink: Link의 스페셜 버전
// 둘의 큰 차이점: 특정 링크에 스타일을 넣을 수 있음
export default Navigation;
Navigation.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
