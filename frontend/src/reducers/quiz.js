import React from 'react'
import { createSlice } from '@reduxjs/toolkit';
import { API_URL } from 'utils/user';
import { ui } from './ui';

const quiz = createSlice({
  name: 'quiz',
  initialState: {
    items: [],
    _id: null,
    title: null,
    creator: null,
    createdAt: null,
    questions: null,
    likes: null,
    public: false,
    interactions: null,
    cathegory: null,
    level: null,
    error: null
  },
  reducers: {
    setItems: (store, action) => {
      store.items = action.payload;
    },
    addItem: (store, action) => {
      store.items = [action.payload, ...store.items]
    },
    setQuizId: (store, action) => {
      store.quizId = action.payload; // kolla upp denna 
    },
    setTitle: (store, action) => {
      store.title = action.payload;
    },
    setCreator: (store, action) => {
      store.creator = action.payload;
    },
    setCreatedAt: (store, action) => {
      store.createdAt = action.payload;
    },
    setQuestions: (store, action) => {
      store.questions = action.payload;
    },
    setLikes: (store, action) => {
      store.likes = action.payload;
    },
    setPublic: (store, action) => {
      store.public = action.payload;
    },
    setInteractions: (store, action) => {
      store.interactions = action.payload;
    },
    setCathegory: (store, action) => {
      store.cathegory = action.payload;
    },
    setLevel: (store, action) => {
      store.level = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
  },
});

export const fetchQuizList = () => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true))
    fetch(API_URL)
    .then((res) = res.json())
    .then((json) => {
      dispatch(quiz.actions.setItems(json))
      dispatch(ui.actions.setLoading(false))
    })
  }
} // needs to be changed with POST/GET ?

export default quiz;

