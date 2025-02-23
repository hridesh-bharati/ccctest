import React, { useState, useEffect } from "react";
import { Container, Card, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import questions from "./QuestionDataBase.jsx";

// Create a single Audio object and preload it
const clickSound = new Audio("/ring1.mp3");
clickSound.preload = "auto"; // Ensures the file is loaded in advance

const playSound = () => {
  clickSound.currentTime = 0; // Reset the sound to start from the beginning
  clickSound.play().catch((error) => {
    console.warn("Audio playback failed:", error);
  });
};

// Timer formatting function
const formatTime = (seconds) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
};

// Timer Display Component
const Time = ({ timeLeft }) => (
  <span className={`fw-bold ${timeLeft <= 3 ? "text-danger" : "text-primary"}`}>
    {formatTime(timeLeft)}
  </span>
);

const QuizQuestions = () => {
  const [username, setUsername] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3600);

  useEffect(() => {
    const timer = setTimeout(() => {
      toast.success("By Hridesh ✨", { position: "top-right", autoClose: 5000 });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isStarted && !isFinished && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      submitQuiz();
    }
  }, [isStarted, isFinished, timeLeft]);

  const handleAnswer = (answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = answer;
    setAnswers(updatedAnswers);
  };

  const submitQuiz = () => {
    const finalScore = answers.reduce(
      (acc, answer, i) => (answer === questions[i].correct ? acc + 1 : acc),
      0
    );
    setScore(finalScore);
    setIsFinished(true);
  };

  const restartQuiz = () => {
    setIsStarted(false);
    setIsFinished(false);
    setIndex(0);
    setScore(0);
    setUsername("");
    setAnswers(Array(questions.length).fill(null));
    setTimeLeft(3600);
  };

  return (
    <Container className="mt-2 maincard">
      <ToastContainer />
      <Card className="p-2 text-center border-0 gdbg shadow">
        <h2 className="fw-bolder bg-primary ccc-title p-2 text-white">CCC ONLINE TEST</h2>

        {!isStarted ? (
          <>
            <Form.Group className="mb-3">
              <Form.Label className="uname">Enter Your Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Button variant="success" disabled={!username.trim()} onClick={() => {
              playSound();
              setIsStarted(true)
            }}>
              Start Quiz
            </Button>
          </>
        ) : isFinished ? (
          <>
            <h4 className="text-success mb-3">Hello {username}! 🎉</h4>
            <h5 className="py-2">Your final score: {score} / {questions.length}</h5>
            <Button variant="primary" onClick={restartQuiz}>Restart Quiz</Button>
          </>
        ) : (
          <>
            <div className="d-flex justify-content-between text-success text-start uinfo p-1">
              <p className="mx-2">Welcome, {username}!</p>
              <p className="mx-2">⏳ Time Left: <Time timeLeft={timeLeft} /></p>
            </div>
            <div className="h5 questions text-start d-flex justify-content-start">
              <p className="position-relative">Q.{index + 1}: &nbsp;</p>
              {questions[index].question}
            </div>

            <div className="mt-1 w-100">
              {questions[index].options.map((option, i) => (
                <div
                  key={i}
                  className={`d-flex align-items-center p-3 mb-3 border rounded ${answers[index] === option ? "bg-info-subtle border-info" : "bg-light"}`}
                  style={{ cursor: "pointer", transition: "0.3s" }}
                  onClick={() => handleAnswer(option)}
                >
                  <input
                    className="form-check-input me-3"
                    type="radio"
                    name={`question-${index}`}
                    checked={answers[index] === option}
                    onChange={() => handleAnswer(option)}
                  />
                  <label className="form-check-label w-100 text-start">
                    {option}
                  </label>
                </div>
              ))}
            </div>

            <div className="mt-4 d-flex w-100 align-items-center justify-content-between">
              <Button variant="secondary" disabled={index === 0} onClick={() => setIndex(index - 1)}>
                Previous
              </Button>
              {index + 1} of {questions.length}
              {index === questions.length - 1 ? (
                <Button variant="primary" onClick={submitQuiz}>Submit Quiz</Button>
              ) : (
                <Button variant="primary" onClick={() => setIndex(index + 1)} disabled={answers[index] === null}>
                  Next
                </Button>
              )}
            </div>
          </>
        )}
      </Card>
    </Container>
  );
};

export default QuizQuestions;
