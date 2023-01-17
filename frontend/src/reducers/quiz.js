import { createSlice } from '@reduxjs/toolkit';

const quiz = createSlice({
  name: 'quiz',
  initialState: {
    _id: null,
    title: null,
    questions: [
      {
        question: '',
        answers: [
          {
            answer: '',
            isCorrect: false,
          },
        ],
      },
    ],
    error: null,
  },
  reducers: {
    setNewTitle: (store, action) => {
      store.title = action.payload;
    },
    setQuestionList: (store, action) => {
      console.log('setQuestionList reducer action.payload', action.payload);
      store.questions = [action.payload, ...store.questions];
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
  },
});

export default quiz;
