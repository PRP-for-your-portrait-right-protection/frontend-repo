import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Mainpage from "./pages/Mainpage";
import AftLoginMainpage from "./pages/AftLoginMainpage";
import ResultVideopage from "./pages/ResultVideopage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/upload" element={<Mainpage />} />
        <Route path="/signin" element={<AftLoginMainpage />} />
        <Route path="/result" element={<ResultVideopage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
