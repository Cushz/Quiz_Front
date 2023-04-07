import React from "react";
import ReactDOM from "react-dom/client";
import Quiz from "./components/Quiz";
import Stats from "./components/Stats";
import Welcome from "./components/Welcome";
import SignIn from "./components/SignIn";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../src/assets/style.css";
import PrivateRoutes from "./utils/PrivateRoutes";
import ExcludingRoutes from "./utils/ExcludingRoutes";
import Dashboard from "./components/Dashboard";
import ExcludingQuizRoute from "./utils/ExcludingQuizRoute";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="dashboard/" element={<Dashboard />} />
        </Route>
        <Route element={<ExcludingRoutes />}>
          <Route path="auth/" element={<SignIn />} />
        </Route>
        <Route element={<ExcludingQuizRoute />}>
          <Route path="quiz/" element={<Quiz />} />
        </Route>
        <Route path="/" element={<Welcome />} />
        <Route path="stats/" element={<Stats />} />
        <Route path="auth/" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
