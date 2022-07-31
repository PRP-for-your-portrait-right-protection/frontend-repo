import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import "./WaitVideos.css";
import { useStore } from "../components/store";
/**
 * @name : Teawon
 * @component :WaitVideos - 현재 처리중인 영상에 대한 celeryID값을 통해 처리 여부를 확인하고 현재 처리중인 영상의 개수를 알려주는 컴포넌트
 * @create-date: 2022-07-26
 *
 */
function WaitVideos() {
  const { task, setTask } = useStore(); //zustand 전역변수

  /**
   * @name : Teawon
   * @function :useEffect - 현재 처리중인 영상의 개수를 정하고, 각 id마다 api를 보내 처리 여부를 확인
   * @create-date: 2022-07-26
   *
   */
  useEffect(() => {
    /**
     * @name : Teawon
     * @function :checkStatus - 특정 id에 대한 상태 값을 요청하는 api를 보내고 완료되었다면 false를 return한다.
     * @create-date: 2022-07-26
     *
     */
    const checkStatus = (celeryId) => {
      console.log("통신을 시작합니다.");
      axios
        .get(`/processed-videos/status/${celeryId}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then(function (response) {
          if (response.data.status === "SUCCESS") {
            let temp = [...task];
            temp = temp.filter((taskId) => celeryId !== taskId);
            setTask(temp);
          }
        })
        .catch(function (error) {
          let temp = [...task];
          temp = temp.filter((taskId) => celeryId !== taskId);
          setTask(temp);
        });
    };

    if (task != null) {
      const result = task.filter((task) => checkStatus(task)); //응답이 false인 id는 현재 리스트값에서 삭제한다.
    }
  }, []);

  return (
    <>
      {task.length != 0 ? (
        <div className="wait-video m-7">
          <p className="text-5xl">
            {" "}
            {task.length} video(s) are being processed.{" "}
          </p>
        </div>
      ) : null}
    </>
  );
}

export default WaitVideos;
