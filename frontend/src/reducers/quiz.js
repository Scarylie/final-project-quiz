import { createSlice } from '@reduxjs/toolkit';

const quiz = createSlice({
  name: 'quiz',
  initialState: {
    items: [],
    _id: null,
    title: null,
  },

  reducers: {
    setItems: (store, action) => {
      store.items = action.payload;
    },
    setQuizId: (store, action) => {
      store.addId = action.payload;
    },
    setTitle: (store, action) => {
      store.title = action.payload;
    },
  },
});

export default quiz;
