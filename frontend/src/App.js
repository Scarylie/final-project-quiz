import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import user from 'reducers/auth';
import quiz from 'reducers/quiz';

import StartPage from 'components/pages/StartPage';
import LogIn from 'components/auth/LogIn';
import Register from 'components/auth/Register';
import Profile from 'components/pages/Profile';
import About from 'components/pages/About';
import QuizFeed from 'components/pages/QuizFeed';
import PlayQuiz from 'components/pages/PlayQuiz';
import Navbar from 'components/Navbar';
import Hero from 'components/Hero';
import CreateQuiz from 'components/pages/CreateQuiz';
import { NotFound } from 'components/NotFound';

const reducer = combineReducers({
  user: user.reducer,
  quiz: quiz.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Hero />
        <Navbar />
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<QuizFeed />} />
          <Route path="/play/:id" element={<PlayQuiz />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/create" element={<CreateQuiz />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
