import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import "./WaitVideos.css";
/**
 * @name : Teawon
 * @component :WaitVideos - 현재 처리중인 영상에 대한 celeryID값을 통해 처리 여부를 확인하고 현재 처리중인 영상의 개수를 알려주는 컴포넌트
 * @create-date: 2022-07-26
 *
 */
function WaitVideos() {
  const [taskList] = useState(JSON.parse(sessionStorage.getItem("task"))); //현재 작업중인 celeryId 리스트
  const [taskNum, setTaskNum] = useState(); //작업 중인 영상 개수

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
            let temp = [...taskList];
            temp = temp.filter((taskId) => celeryId !== taskId);
            console.log(
              "배열 값에 sucess가 들어왔습니다. 해당 값을 배열에서 삭제합니다. 바뀐값 : "
            );
            console.log(temp);
            sessionStorage.setItem("task", JSON.stringify(temp));
          }
          console.log("peding이므로 삭제하지 않습니다.");
        })
        .catch(function (error) {
          let temp = [...taskList];
          temp = temp.filter((taskId) => celeryId !== taskId);
          console.log(
            "배열 값에 에러가 들어왔습니다. 해당 값을 배열에서 삭제합니다. 바뀐값 : "
          );
          console.log(temp);
          sessionStorage.setItem("task", JSON.stringify(temp));
          console.log("ERROR 발생");
          console.log(error);
        });
    };

    if (taskList != null) {
      //만약 taskList에 값이 있다면 해당 개수를 지정하여 화면에 보여준다.
      setTaskNum(taskList.length);
      // let preTaskList = taskList;
      // console.log("teskList");
      // console.log(taskList);

      // console.log("이전 값");
      // console.log(preTaskList);

      const result = taskList.filter((task) => checkStatus(task)); //응답이 false인 id는 현재 리스트값에서 삭제한다.
      // console.log("이후 값");
      // console.log(result);

      // sessionStorage.setItem("task", JSON.stringify(result));
    }
  }, []);

  return (
    <>
      {taskNum ? (
        <div className="wait-video m-7">
          <p className="text-5xl"> 현재 {taskNum} 개의 영상이 처리중입니다 </p>
        </div>
      ) : null}
    </>
  );
}

export default WaitVideos;
