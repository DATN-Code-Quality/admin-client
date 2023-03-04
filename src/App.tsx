import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { authSelector } from "./adapters/redux/selectors/auth";
import Login from "./ui/modules/login/containers/Login";
import LayoutApp from "./ui/shared/layout/LayoutApp";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<LayoutApp />} />
    </Routes>
  );
};

export default App;
