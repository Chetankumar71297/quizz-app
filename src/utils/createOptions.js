const updateQuestionsArray = (questionsArray) => {
  let updatedQuestionsArray = [];
  for (let i = 0; i < questionsArray.length; i++) {
    let question = questionsArray[i];
    let randomIndex = Math.floor(Math.random() * questionsArray.length);
    const optionToAdd = question.correct_answer;
    const options = [
      ...question.incorrect_answers.slice(0, randomIndex),
      optionToAdd,
      ...question.incorrect_answers.slice(randomIndex),
    ];
    question = { ...question, options };
    updatedQuestionsArray.push(question);
  }
  return updatedQuestionsArray;
};

export default updateQuestionsArray;
