import { createSlice } from '@reduxjs/toolkit';

const quizzes = () => {};

const quiz = createSlice({
  name: 'quiz',
  initialState: {
    items: [], // gets an array from the backend (anteckning från tidigare project)
    _id: null,
    title: null,
    questions: null,
    answers: [],
    quizOver: false,
    error: null,
    // maybe isCorrect?
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
      store.items = [action.payload, ...store.items];
    },
    setQuestions: (store, action) => {
      store.questions = action.payload;
    },
    setAnswer: (store, action) => {
      store.answer = action.payload;
    },
    deleteQuiz: (store, action) => {
      const deleteItems = store.items.filter(
        (item) => item.id !== action.payload
      );
      store.items = deleteItems;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },

    // PLAY QUIZ
    submitAnswer: (store, action) => {
      const { questionId, answerIndex } = action.payload;
      const question = store.questions.find((q) => q.id === questionId);
      if (!question) {
        throw new Error(
          'Could not find question! Check to make sure you are passing the question id correctly.'
        );
      }
      if (question.options[answerIndex] === undefined) {
        throw new Error(
          `You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`
        );
      }
      store.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex, // do we need "correctAnswerIndex" in backend?
      });
    },
    goToNextQuestion: (store) => {
      if (store.currentQuestionIndex + 1 === store.questions.length) {
        store.quizOver = true;
      } else {
        store.currentQuestionIndex += 1;
      }
    },
    restart: () => {
      return initialState;
    },
  },
});
// thunks
// reducer för resultat + commentarer och likes
// behövs reducer för "played quiz"? typ som toggledToDo fast automatiskt när en quiz är spelad?

// ********* This is thunks to be inspired from...

/* export const fetchStart = () => {
  return (dispatch, getState) => {
    dispatch(ui.actions.setLoading(true));
    fetch(API_START, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: getState().game.username }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(`Response data: ${JSON.stringify(data)}`);
        return dispatch(game.actions.setCurrentPosition(data));
      })
      .finally(() => dispatch(ui.actions.setLoading(false)));
  };
};

export const fetchAction = (action) => {
  return (dispatch, getState) => {
    dispatch(ui.actions.setLoading(true));
    fetch(API_ACTION, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: getState().game.username,
        type: action.type,
        direction: action.direction,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(`Response action: ${JSON.stringify(data)}`);
        dispatch(game.actions.setCurrentPosition(data));
        dispatch(game.actions.setHistory(data));
      })
      .finally(() => dispatch(ui.actions.setLoading(false)));
  };
}; */

export default quiz;
