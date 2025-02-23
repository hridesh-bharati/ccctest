import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

const Score = () => {
  const { score, total } = useParams();
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <Card className="p-4 text-center shadow">
        <h2>Quiz Completed!</h2>
        <h4>Your Score: {score} / {total}</h4>
        <Button variant="success" className="mt-3" onClick={() => navigate("/")}>Restart Quiz</Button>
      </Card>
    </Container>
  );
};

export default Score;
