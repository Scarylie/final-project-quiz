import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider, batch, useDispatch } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import user from 'reducers/auth';
import quiz from 'reducers/quiz';

import { StartPage } from 'components/StartPage';
import LogIn from 'components/auth/LogIn';
import Register from 'components/auth/Register';
import Profile from 'components/profile';
import QuizFeed from 'components/quiz/QuizFeed';
import PlayQuiz from 'components/quiz/PlayQuiz';
import { NotFound } from 'components/NotFound';
import Navbar from 'components/Navbar';

const reducer = combineReducers({
  user: user.reducer,
  quiz: quiz.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/quiz" element={<QuizFeed />} />
          <Route path="/quiz/:id" element={<PlayQuiz />} />
          <Route path="/profile" element={<Profile />} />


          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
