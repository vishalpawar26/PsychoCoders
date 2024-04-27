import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import React from "react";

import "./App.css";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Error404Page from "./pages/Error404Page";
import Problem from "./problems/Problem";
import Dashboard from "./pages/Dashboard";
import UserSolutionPage from "./pages/UserSolutionPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="/problems">
              <Route path=":key">
                <Route path=":value" element={<HomePage />} />
              </Route>
              <Route path=":key">
                <Route path=":value" element={<HomePage />} />
              </Route>
            </Route>
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/user">
            <Route path=":username" element={<Dashboard />} />
          </Route>
          <Route path="/problem">
            <Route path=":problemId" element={<Problem />} />
          </Route>
          <Route path="/userSolution">
            <Route path=":submissionId" element={<UserSolutionPage />} />
          </Route>
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
