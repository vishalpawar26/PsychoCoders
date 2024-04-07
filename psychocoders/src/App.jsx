import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Error404Page from "./pages/Error404Page";
import Problem from "./problems/Problem";
import Dashboard from "./pages/Dashboard";
import UserSolutionPage from "./pages/UserSolutionPage";

function App() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4001/problems")
      .then((problems) => {
        setProblems(problems.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage problems={problems} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route
            path="/dashboard"
            element={<Dashboard totalProblems={problems.length} />}
          />
          <Route path="/problem/">
            <Route path="*" element={<Problem />} />
          </Route>
          <Route path="/userSolution">
            <Route path="*" element={<UserSolutionPage />} />
          </Route>
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
