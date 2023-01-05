import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { API_QUIZ } from 'utils/user';
import quiz from 'reducers/quiz'

const QuizFormQuestions = () => {
  const [isCorrect, setIsCorrect] = useState()
  /* const [newQuestion, setNewQuestion] = useState({
    question: "",
    answers: [],
  }) */

 /*  const [newQuestion, setNewQuestion] = useState('') */
/*   const [newAnswers, setNewAnswers] = useState([{
    answers: [
      answer
    ] 
  }])

  const [newQuestion, setNewQuestion] = useState([{ 
    questions: [
      question
    ] }]) */

    // !! Just nu displayas inget, jag har försökt få till att allt ska kunna synas, men inte lyckats.
    const [questionsList, setQuestionsList] = useState({
        questions: []
    })
    const [oneQuestion, setOneQuestion] = useState({
        question: "",
        answers: []
    });
    const [answersList, setAnswersList] = useState({
        answers: answer
    })
    const [answer, setAnswer] = useState('')
/* 
    const newQuestion = {
      question: question,
      answers: [answer]
    }
 */
  const onFormQuestionSubmit = (event) => {
    event.preventDefault();
    const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            /* 'Authorization': accessToken */
          },
          body: JSON.stringify({ ...newQuestion, isCorrect })
          /* body: JSON.stringify({ ...newQuestion, answers: {answer: event.target.value}, isCorrect }) */
        }
        fetch(API_QUIZ, options)
        .then((res) => res.json())
        .then((data) => {
          batch(() => {
          dispatch(quiz.actions.addQuestion(data.response))
          dispatch(quiz.actions.setIsCorrect(data.response))
          dispatch(quiz.actions.setError(null))
        })
        })
        .catch((error) => {
          dispatch(quiz.actions.setError(error.response))
        })
        .finally(() => {
          setNewQuestion({
            /* ...newQuestion, answers: {answer: event.target.value}, isCorrect */
            question: "",
            answers: []
          })
        })
  };

  /* const questionList = useSelector((store) => store.quiz.items); */

  return (
    <>
    <form onSubmit={onFormQuestionSubmit}>
      <textarea
          className="quiz-title"
          value={newQuestion.question}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, question: e.target.value })
          }
          placeholder="Add Question"
          autoComplete="off" />
      <div id="div1">
        <input 
          className="answer" 
          type="radio" // not possible to click yet
          value="isCorrect" 
          checked={isCorrect === "Correct answer"}
          onChange={(e) => setIsCorrect(e.target.value)} />
        <input
          className="answer"  
          type="text" 
          value={newQuestion.answer}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, answers: e.target.value }) // when writing in one input, its the same in all
          }
          placeholder="Answer"
          autoComplete="off" />
          </div>
      <div id="div1">
        <input 
          className="answer" 
          type="radio" 
          value="isCorrect" 
          checked={isCorrect === "Correct answer"}
          onChange={(e) => setIsCorrect(e.target.value)} />
        <input
          className="answer"  
          type="text" 
          value={newQuestion.answer}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, answers: e.target.value })
          }
          placeholder="Answer"
          autoComplete="off" />
          </div>
      <div id="div1">
        <input 
          className="answer"  
          type="radio"
          value="isCorrect"  
          checked={isCorrect === "Correct answer"}
          onChange={(e) => setIsCorrect(e.target.value)} />
        <input 
          className="answer"
          type="text" 
          value={newQuestion.answer}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, answers: e.target.value })
          }
          placeholder="Answer"
          autoComplete="off" />
          </div>
      <div id="div1">
        <input 
          className="answer" 
          type="radio"
          value="isCorrect"  
          checked={isCorrect === "Correct answer"}
          onChange={(e) => setIsCorrect(e.target.value)} />
        <input 
          className="answer"
          type="text" 
          value={newQuestion.answer}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, answers: e.target.value })
          }
          placeholder="Answer"
          autoComplete="off" />
          </div>
          <button className="addQuestionBtn">save</button>
      </form>
    </> 
  );
};

export default QuizFormQuestions;
