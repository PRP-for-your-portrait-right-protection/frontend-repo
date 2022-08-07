import UploadImagePage from "./pages/UploadImagePage";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Mainpage from "./pages/Mainpage";
import Loginpage from "./pages/Loginpage";
import ForgetEmailpage from "./pages/ForgetEmailpage";
import ForgetPasswordpage from "./pages/ForgetPasswordpage";
import "./App.css";
import ResultPage from "./pages/ResultPage";
import EffectPage from "./pages/EffectPage";
import WhiteListPage from "./pages/WhiteListPage";
import Character from "./pages/CharacterPage";
import VideoUploadPage from "./pages/VideoUploadPage";
import SignUpPage from "./pages/SignUpPage";
import ReactGA from "react-ga";
import RequireAuth from "./store/RequireAuth";
import usePageTracking from "./utils/usePageTracking";
import UserVideoPage from "./pages/UserVideoPage";

const TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID;
ReactGA.initialize(TRACKING_ID);

function App() {
  usePageTracking();
  return (
    <Routes>
      <Route path="/" element={<Mainpage />} />
      <Route path="/signin" element={<Loginpage />} />
      <Route path="/signup" element={<SignUpPage />} />
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
            <VideoUploadPage />{" "}
          </RequireAuth>
        }
      />
      <Route
        path="/effect"
        element={
          <RequireAuth>
            {" "}
            <EffectPage />{" "}
          </RequireAuth>
        }
      />
      <Route
        path="/result"
        element={
          <RequireAuth>
            {" "}
            <ResultPage />{" "}
          </RequireAuth>
        }
      />
      <Route
        path="/user/video"
        element={
          <RequireAuth>
            {" "}
            <UserVideoPage />{" "}
          </RequireAuth>
        }
      />
      <Route
        path="/user/photo"
        element={
          <RequireAuth>
            {" "}
            <WhiteListPage />{" "}
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
