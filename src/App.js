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
import usePageTracking from "./components/usePageTracking";

const TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID;
ReactGA.initialize(TRACKING_ID);

function App() {
  usePageTracking();
  return (
    <Routes>
      <Route path="/" element={<Mainpage />} />
      <Route path="/signin" element={<Loginpage />} />
      <Route path="/signup" element={<SignUppage />} />
      <Route path="/user/find/email" element={<ForgetEmailpage />} />
      <Route path="/user/reset/password" element={<ForgetPasswordpage />} />
      <Route
        path="/whitelist-face"
        element={
          <RequireAuth>
            {" "}
            <UploadImagePage />{" "}
          </RequireAuth>
        }
      />
      <Route
        path="/video"
        element={
          <RequireAuth>
            {" "}
            <VideoUpload />{" "}
          </RequireAuth>
        }
      />
      <Route
        path="/effect"
        element={
          <RequireAuth>
            {" "}
            <Mosaic />{" "}
          </RequireAuth>
        }
      />
      <Route
        path="/result"
        element={
          <RequireAuth>
            {" "}
            <Result />{" "}
          </RequireAuth>
        }
      />
      <Route
        path="/user/video"
        element={
          <RequireAuth>
            {" "}
            <Video />{" "}
          </RequireAuth>
        }
      />
      <Route
        path="/user/photo"
        element={
          <RequireAuth>
            {" "}
            <Photo />{" "}
          </RequireAuth>
        }
      />
      <Route
        path="/user/character"
        element={
          <RequireAuth>
            {" "}
            <Character />{" "}
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
