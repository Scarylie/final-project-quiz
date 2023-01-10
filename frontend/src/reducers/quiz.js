import { createSlice } from '@reduxjs/toolkit';

const quiz = createSlice({
  name: 'quiz',
  initialState: {
    _id: null,
    title: null,
    questions: [],
    question: [],
    error: null,
  },
  reducers: {
    setTitle: (store, action) => {
      store.title = action.payload;
    },
    setQuestionTitle: (store, action) => {
      store.question = action.payload;
    },
    setQuestionList: (store, action) => {
      store.questions = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
  },
});

export default quiz;
