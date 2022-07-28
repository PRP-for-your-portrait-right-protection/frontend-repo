import UploadImagePage from "./pages/UploadImagePage";
import React from "react";
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
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/people" element={<UploadImagePage />} />
        <Route path="/signin" element={<Loginpage />} />
        <Route path="/signup" element={<SignUppage />} />
        <Route path="/email" element={<ForgetEmailpage />} />
        <Route path="/reset" element={<ForgetPasswordpage />} />

        <Route path="/upload" element={<UploadImagePage />} />
        <Route path="/VideoUpload" element={<VideoUpload />} />
        <Route path="/Mosaic" element={<Mosaic />} />
        <Route path="/Result" element={<Result />} />

        <Route path="/Video" element={<Video />} />
        <Route path="/Photo" element={<Photo />} />
        <Route path="/Character" element={<Character />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
