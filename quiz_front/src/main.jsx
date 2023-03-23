import React from "react";
import ReactDOM from "react-dom/client";
import Quiz from "./components/Quiz";
import Stats from "./components/Stats"
import Welcome from "./components/Welcome"
import SignIn from "./components/SignIn";
import QuestionManagement from "./components/QuestionManagement";
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../src/assets/style.css"
import Navbar from "./components/Navbar";
import dotenv from "dotenv";
import PrivateRoutes from "./utils/PrivateRoutes";
import ExcludingRoutes from "./utils/ExcludingRoutes";


ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
        <Route element={<PrivateRoutes/>}>
            <Route path="dashboard/" element={<QuestionManagement />} />
          </Route>
          <Route element={<ExcludingRoutes/>}>
            <Route path="auth/" element={<SignIn />} />
          </Route>
          <Route path="/" element={<Welcome />} />
          <Route path="quiz/" element={<Quiz />} />
          <Route path="stats/" element={<Stats />} />
          <Route path="auth/" element={<SignIn />} /> 
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
  </ChakraProvider>
  
);
