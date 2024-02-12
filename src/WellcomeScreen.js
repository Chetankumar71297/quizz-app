import React, { useState } from "react";
import "./index.css";
import Question from "./components/questions/Question";
import {
  getTenRandomQuestions,
  setActiveQuestionToNull,
} from "./features/questionSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCorrectAnswer } from "./features/resultSlice";

const WelcomeScreen = () => {
  const [startOrEndQuiz, setStartOrEndQuiz] = useState("start");
  const dispatch = useDispatch();
  const { status, activeQuestion } = useSelector(
    (state) => state.questionsData
  );
  const { correctAnswer } = useSelector((state) => state.results);

  const startQuizHandler = async () => {
    await dispatch(getTenRandomQuestions());
    setStartOrEndQuiz("start");
  };

  const restartQuizHandler = async () => {
    await dispatch(setActiveQuestionToNull());
    await dispatch(setCorrectAnswer());
  };

  return (
    <div className="main-container">
      {!activeQuestion ? (
        <div className="welcome-screen">
          <h1>Welcome to the Computer Quiz!</h1>
          <p>Test your knowledge on computer-related questions.</p>
          <button onClick={startQuizHandler}>
            {status === "loading" ? "Loading..." : "Start Quiz"}
          </button>
        </div>
      ) : startOrEndQuiz === "start" ? (
        <Question setStartOrEndQuiz={setStartOrEndQuiz} />
      ) : (
        <div>
          <h1>Quiz has ended</h1>
          <p>You got {correctAnswer} correct out of 10 question</p>
          <button onClick={restartQuizHandler}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default WelcomeScreen;
