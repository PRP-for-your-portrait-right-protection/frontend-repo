import Mainpage from "./pages/Mainpage";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
