import React from "react";
import Main from "./pages/Main";

import { Route, Routes } from "react-router-dom";
import FormPage from "./pages/FormPage";
import ListPage from "./pages/ListPage";
import ComputerDetail from "./pages/ComputerDetail";
import Success from "./pages/Success";

import "./styles/general/App.scss";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/forms-page" element={<FormPage />} />
        <Route path="/list-of-computers" element={<ListPage />} />
        <Route path="/computer-details/:id" element={<ComputerDetail />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </div>
  );
};

export default App;
