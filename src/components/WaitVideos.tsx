import React, { useState, useRef, useEffect } from "react";

function WaitVideos() {
  const [taskList, setTaskList] = useState(
    JSON.parse(sessionStorage.getItem("task"))
  );
  const [taskNum, setTaskNum] = useState();

  useEffect(() => {
    const checkStatus = (celeryId) => {
      console.log(celeryId);
      return Math.random() > 0.5;
    };

    if (taskList != null) {
      setTaskNum(taskList.length);

      let preTaskList = taskList;
      preTaskList = preTaskList.filter((task) => checkStatus(task));
      console.log(preTaskList);

      sessionStorage.setItem("task", JSON.stringify(preTaskList));
    }
  }, []);

  return (
    <>
      {taskNum ? (
        <div className="title-component  mt-28">
          <p className=""> 현재 {taskNum} 개의 영상이 처리중입니다. </p>
        </div>
      ) : null}
    </>
  );
}

export default WaitVideos;
