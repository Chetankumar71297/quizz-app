import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  correctAnswer: 0,
};

export const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    updateCorrectAnswer: (state) => {
      state.correctAnswer = state.correctAnswer + 1;
    },
    setCorrectAnswer: (state) => {
      state.correctAnswer = 0;
    },
  },
});

export const { updateCorrectAnswer, setCorrectAnswer } = resultSlice.actions;

export default resultSlice.reducer;
