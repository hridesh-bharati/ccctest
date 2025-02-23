import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizQuestions from "./assets/QuizQuestions";
import Score from "./assets/Score";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizQuestions />} />
        <Route path="/score/:score/:total" element={<Score />} />
      </Routes>
    </Router>
  );
};

export default App;
