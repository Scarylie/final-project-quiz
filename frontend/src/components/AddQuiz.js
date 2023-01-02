import React, { useState } from 'react'
import { useSelector, useDispatch, batch } from "react-redux";
import { API_URL } from 'utils/user';

const AddQuiz = () => {
    const id = useSelector((store) => store.user.userId);
    const accessToken = useSelector((store) => store.user.accessToken); 
    const [isCorrect, setIsCorrect] = useState("Correct")
    const [title, setTitle] = useState("")
    const [input, setInput] = useState({
      question: "",
      answer: "",
      answer: "",
      answer: "",
      answer: "",
    })

    const dispatch = useDispatch();

    const onFormSubmit = (event) => {
        event.preventDefault();
        dispatch(postQuiz());
        /* const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken
          },
          body: JSON.stringify({ ...items, isCorrect})
        }
        fetch(API_URL(`${quiz}`), options)
        .then((res) => res.json())
        .then((data) => {
          batch(() => {
          dispatch(quiz.actions.addQuiz(data.response))
          dispatch(quiz.actions.setError(null))
        })
        })
        .catch((error) => {
          dispatch(quiz.actions.setError(error.response))
        })
        .finally(() => {
          setTitle({title: ""}),
          setInput({
            question: "",
            answer: "",
            answer: "",
            answer: "",
            answer: "",
          })
        }) */
      };
      

    return (
        <form onSubmit={onFormSubmit}>
            <input
            className="quiz-title"
            type="text"
            // value={input}
            // onChange=
            placeholder= "Add Quiz name"
            autoComplete="off" />
            <button type="submit"> 
                save
            </button>
        </form>
    )
}

export default AddQuiz