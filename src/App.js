import Mainpage from "./pages/Mainpage";
import UploadImagePage from "./pages/UploadImagePage";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/upload" element={<UploadImagePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
