import UploadImagePage from "./pages/UploadImagePage";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Mainpage from "./pages/Mainpage";
import AftLoginMainpage from "./pages/AftLoginMainpage";
import Loginpage from "./pages/Loginpage";
import ResultVideopage from "./pages/ResultVideopage";
import "./App.css";
import Result from "./pages/Result";
import Loading from "./pages/Loading";
import Mosaic from "./pages/Mosaic";
import Video from "./pages/Video";
import Photo from "./pages/Photo";
import Character from "./pages/Character";
import VideoUpload from "./pages/VideoUpload";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/people" element={<UploadImagePage />} />
        <Route path="/signin" element={<Loginpage />} />
        <Route path="/main" element={<AftLoginMainpage />} />
        <Route path="/videoResult" element={<ResultVideopage />} />
        <Route path="/upload" element={<UploadImagePage />} />
        <Route path="/VideoUpload" element={<VideoUpload />} />
        <Route path="/Mosaic" element={<Mosaic />} />
        <Route path="/Result" element={<Result />} />
        <Route path="/Loading" element={<Loading />} />
        <Route path="/Video" element={<Video />} />
        <Route path="/Photo" element={<Photo />} />
        <Route path="/Character" element={<Character />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
