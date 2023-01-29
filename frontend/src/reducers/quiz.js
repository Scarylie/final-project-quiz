import { createSlice } from '@reduxjs/toolkit';

const quiz = createSlice({
  name: 'quiz',
  initialState: {
    _id: null,
    title: null,
    questions: [],
    error: null,
  },
  reducers: {
    setNewTitle: (store, action) => {
      store.title = action.payload;
    },
    setQuestionList: (store, action) => {
      store.questions = [action.payload, ...store.questions];
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
  },
});

export default quiz;
