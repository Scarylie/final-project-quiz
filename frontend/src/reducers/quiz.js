import { createSlice } from '@reduxjs/toolkit';

const quiz = createSlice({
  name: 'quiz',
  initialState: {
    items: [], // gets an array from the backend (anteckning från tidigare project)
    _id: null,
    title: null,
    questions: null,
    answer: [],
    error: null,
  },

  reducers: {
    setAllItems: (store, action) => {
      store.items = action.payload;
    },
    setQuizId: (store, action) => {
      store.addId = action.payload;
    },
    setTitle: (store, action) => {
      store.title = action.payload;
    },
    addQuestion: (store, action) => {
      store.items = [action.payload, ...store.items]
    },
    setQuestions: (store, action) => {
      store.questions = action.payload;
    },
    setAnswer: (store, action) => {
      store.answer = action.payload;
    },
    deleteQuiz: (store, action) => {
      const deleteItems = store.items.filter((item) => item.id !== action.payload)
      store.items = deleteItems
    },
    setError: (store, action) => {
      store.error = action.payload;
    }
  },
});
// thunks
// reducer för resultat + commentarer och likes
// behövs reducer för "played quiz"? typ som toggledToDo fast automatiskt när en quiz är spelad?

export default quiz;
