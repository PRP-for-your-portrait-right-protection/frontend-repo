import UploadImagePage from "./pages/UploadImagePage";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Mainpage from "./pages/Mainpage";
import Loginpage from "./pages/Loginpage";
import ForgetEmailpage from "./pages/ForgetEmailpage";
import ForgetPasswordpage from "./pages/ForgetPasswordpage";
import "./App.css";
import Result from "./pages/Result";
import Mosaic from "./pages/Mosaic";
import Video from "./pages/Video";
import Photo from "./pages/Photo";
import Character from "./pages/Character";
import VideoUpload from "./pages/VideoUpload";
import SignUppage from "./pages/SignUppage";
import ReactGA from "react-ga";
import RequireAuth from "./components/RequireAuth";

const TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID;
ReactGA.initialize(TRACKING_ID);

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const nowDate = new Date().getTime();

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);

    if (JSON.parse(localStorage.getItem("token")) != null) {
      if (nowDate > Number(JSON.parse(localStorage.getItem("token")).expire)) {
        setIsLogin(false);
        console.log("토큰 있는데 만료되서 로그인아님");
      } else {
        setIsLogin(true);
        console.log("토큰 있고 만료 안됨 로그인상태");
      }
    } else {
      setIsLogin(false);
      console.log("토큰 없어서 로그인아님");
    }
  }, [nowDate]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainpage />} />

        <Route path="/signin" element={<Loginpage />} />
        <Route path="/signup" element={<SignUppage />} />
        <Route path="/email" element={<ForgetEmailpage />} />
        <Route path="/reset" element={<ForgetPasswordpage />} />

        <Route
          path="/upload"
          element={
            <RequireAuth>
              {" "}
              <UploadImagePage />{" "}
            </RequireAuth>
          }
        />
        <Route
          path="/VideoUpload"
          element={
            <RequireAuth>
              {" "}
              <VideoUpload />{" "}
            </RequireAuth>
          }
        />

        <Route
          path="/Mosaic"
          element={
            <RequireAuth>
              {" "}
              <Mosaic />{" "}
            </RequireAuth>
          }
        />

        <Route
          path="/Result"
          element={
            <RequireAuth>
              {" "}
              <Result />{" "}
            </RequireAuth>
          }
        />

        <Route
          path="/Video"
          element={
            <RequireAuth>
              {" "}
              <Video />{" "}
            </RequireAuth>
          }
        />

        <Route
          path="/Photo"
          element={
            <RequireAuth>
              {" "}
              <Photo />{" "}
            </RequireAuth>
          }
        />

        <Route
          path="/Character"
          element={
            <RequireAuth>
              {" "}
              <Character />{" "}
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
