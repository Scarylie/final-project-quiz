import React from "react";
import { useState } from "react";

const QuizAnswer = ({ answerText, isCorrect}) => {
    console.log('QuizAnswer', answerText)
    console.log('QuizAnswer', isCorrect)

    const [isCorrectData, setIsCorrectData] = useState(isCorrect)
    const [answerTextData, setAnswerTextData] = useState(answerText)

    console.log('QuizAnswer', answerTextData)
    console.log('QuizAnswer', isCorrectData)

// behöver denna wrappas i form? Hur får vi ett text area? och ska vi ha knapp för att lägga till fler frågor här också?
// https://reactjs.org/docs/lifting-state-up.html

return(
   <div>
    <label> 
        <input
            className="answer"
            type="radio" 
            value={answerTextData}
            checked={isCorrectData === "Correct answer"}
            onChange={(e) => setAnswerTextData(e.target.value)} />  
        <button className="addAnswerBtn">Remove</button>
        </label>
    </div>
)
}

export default QuizAnswer