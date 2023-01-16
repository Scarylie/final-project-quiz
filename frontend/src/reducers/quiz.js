import { createSlice } from '@reduxjs/toolkit';

const quiz = createSlice({
  name: 'quiz',
  initialState: {
    _id: null,
    title: null,
    questionList: [{}],
    error: null,
  },
  reducers: {
    setNewTitle: (store, action) => {
      store.title = action.payload;
    },
    setQuestionList: (store, action) => {
      console.log('setQuestionList reducer action.payload', action.payload);
      store.question = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
  },
});

export default quiz;
