import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ExcludingQuizRoute = () => {
  const quizId = localStorage.getItem("quizId");
  return window.location.pathname == "/quiz" && quizId == null ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  );
};

export default ExcludingQuizRoute;
