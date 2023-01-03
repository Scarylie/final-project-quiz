import { createSlice } from '@reduxjs/toolkit';

const quiz = createSlice({
  name: 'quiz',
  initialState: {
    items: [], // gets an array from the backend (anteckning från tidigare project)
    _id: null,
    title: null,
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
    addQuiz: (store, action) => {
      const newQuiz = {
        id: uniqid(), // do we need?
        text: action.payload,
        postedTime: moment().format('MMM Do YY') // do we need?
      };
      store.items = [newQuiz, ...store.items]
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
