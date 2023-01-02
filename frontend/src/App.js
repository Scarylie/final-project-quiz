import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import user from 'reducers/auth';
import { StartPage } from 'components/StartPage';
import LogIn from 'components/auth/LogIn';
import Register from 'components/auth/Register';
import Profile from 'components/profile';
import QuizFeed from 'components/quiz/QuizFeed';
import PlayQuiz from 'components/quiz/PlayQuiz';
import { NotFound } from 'components/NotFound';

const reducer = combineReducers({
  user: user.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/quiz" element={<QuizFeed />} />
          <Route path="/quiz/:id" element={<PlayQuiz />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
