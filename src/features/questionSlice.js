import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import updateQuestionsArray from "../utils/createOptions";

const RANDOM_QUESTIONS_API =
  "https://opentdb.com/api.php?amount=10&category=18&type=multiple";

const initialState = {
  status: "",
  error: "",
  questions: [],
  activeQuestion: null,
};

export const getTenRandomQuestions = createAsyncThunk(
  "quiz/questionsData",
  async () => {
    try {
      const { data } = await axios(RANDOM_QUESTIONS_API);

      let questions = data.results;
      let questionsWithOptions = updateQuestionsArray(questions);

      return questionsWithOptions;
    } catch (error) {
      return error;
    }
  }
);

export const questionSlice = createSlice({
  name: "questionsData",
  initialState,
  reducers: {
    updateQuestions: (state, action) => {
      state.questions = action.payload;
    },
    updateActiveQuestion: (state, action) => {
      state.activeQuestion = state.questions[action.payload - 1];
      state.activeQuestion.questionNumber = action.payload;
    },
    setActiveQuestionToNull: (state) => {
      state.activeQuestion = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTenRandomQuestions.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getTenRandomQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        state.questions = action.payload;
        state.activeQuestion = action.payload[0];
        state.activeQuestion.questionNumber = 1;
      })
      .addCase(getTenRandomQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  updateQuestions,
  updateActiveQuestion,
  setActiveQuestionToNull,
} = questionSlice.actions;

export default questionSlice.reducer;
