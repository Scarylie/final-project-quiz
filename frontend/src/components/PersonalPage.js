import react from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuizList } from 'reducers/quiz';

const PersonalPage = () => {
    const quiz = useSelector((store) => store.quiz.items)
    const dispatch = useDispatch()
    
    return (
        <div>
            <h1>Quiz</h1>
            <button type="button" onClick={() => dispatch(fetchQuizList())}>
                Get
            </button>
            <ul>
                {quiz.map((quizes) => (
                    <li key={quizes.id}>
                        {quizes.title}
                    </li>
                ))}
            </ul>


        </div>
    )
}

export default PersonalPage