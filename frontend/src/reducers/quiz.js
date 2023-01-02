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
      store.items = [action.payload, ...store.items] // ska hantera när man addar en fråga
    },
    setQuizId: (store, action) => {
      store.quizId = action.payload;
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
    setCategory: (store, action) => {
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

export const postQuiz = () => {
    return (dispatch, getState) => {
      dispatch(ui.actions.setLoading(true))
      fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken
        },
        body: JSON.stringify({ items: getState().quiz.items })
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
        dispatch(quiz.actions.setItems(data))
        dispatch(ui.actions.setLoading(false))
        dispatch(quiz.actions.setError(null))
      } else {
        dispatch(quiz.actions.setItems([]));
        dispatch(quiz.actions.setError(data.response))
      }
      })
    }
}

export const getPersonalQuizList = (/* id/accessToken */) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  }
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true))
    fetch(API_URL(`/profile/${data.response.id}`), options)
    .then((res) = res.json())
    .then((data) => {
      if(data.success) {
        dispatch(quiz.actions.setItems(data.response))
        dispatch(ui.actions.setLoading(false))
        dispatch(quiz.actions.setError(null))
      } else {
        dispatch(quiz.actions.setItems([]));
        dispatch(quiz.actions.setError(data.response))
      }
    })
  }
}

export default quiz;

