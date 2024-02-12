import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveQuestionToNull,
  updateActiveQuestion,
} from "../../features/questionSlice";
import { updateCorrectAnswer } from "../../features/resultSlice";

export default function Question({ setStartOrEndQuiz }) {
  const dispatch = useDispatch();
  let { questionNumber } = useSelector(
    (state) => state.questionsData.activeQuestion
  );
  const { activeQuestion } = useSelector((state) => state.questionsData);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };

  const handleNext = () => {
    if (
      activeQuestion.correct_answer === activeQuestion.options[selectedOption]
    ) {
      dispatch(updateCorrectAnswer());
    }
    setSelectedOption(null);
    if (questionNumber < 10) {
      let newQuestionNumber = questionNumber + 1;
      dispatch(updateActiveQuestion(newQuestionNumber));
    } else {
      setStartOrEndQuiz("end");
    }
  };

  return (
    <div>
      <div>
        <p
          className="question-text"
          dangerouslySetInnerHTML={{ __html: activeQuestion.question }}
        />
      </div>
      <div className="options-container">
        {activeQuestion.options.map((option, index) => (
          <button
            key={index}
            dangerouslySetInnerHTML={{ __html: option }}
            className={`option ${selectedOption === index ? "selected" : ""}`}
            onClick={() => handleOptionClick(index)}
          />
        ))}
      </div>
      <div className="next-button-container">
        <button onClick={() => handleNext()}>
          {questionNumber === 10 ? "Result" : "Next"}
        </button>
      </div>
    </div>
  );
}
