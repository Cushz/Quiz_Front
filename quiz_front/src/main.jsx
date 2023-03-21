import React from "react";
import ReactDOM from "react-dom/client";
import Quiz from "./components/Quiz";
import Stats from "./components/Stats"
import Welcome from "./components/Welcome"
import SignIn from "./components/SignIn";
import GroupSelection from "./components/GroupSelection";
import QuestionManagement from "./components/QuestionManagement";
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../src/assets/style.css"
ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="quiz/" element={<Quiz />} />
          <Route path="stats/" element={<Stats />} />
          <Route path="auth/" element={<SignIn />} /> 
          <Route path="groups/" element={<GroupSelection />} />
          <Route path="manage/" element={<QuestionManagement />} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
  </ChakraProvider>
  
);
