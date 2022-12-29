import React, { useState } from 'react'
import { useSelector, useDispatch, batch } from "react-redux";

const AddQuiz = () => {
    const id = useSelector((store) => store.user.userId);
    const accessToken = useSelector((store) => store.user.accessToken);
    const [input, setInput] = useState('')

    const onAddQuiz = (event) => {
        event.preventDefault();
        if (input !== '') {
          dispatch(todos.actions.addQuiz(input))
          setInput('')
        } /* else {
          alert('You have to write a To Do before adding');
        } */
      };
      const onInputChange = (event) => {
        setInput(event.target.value)
      };

    return (
        <form >
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