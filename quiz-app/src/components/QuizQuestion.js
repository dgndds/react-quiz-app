import axios from 'axios'
import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'

const api = axios.create({
    baseURL:'https://opentdb.com/api.php'
})

const QuizQuestion = ({categoryId}) => {
    const [questions,setQuestions] = useState([]);
    const [questionNumber, setQuestionNumber] = useState(1);
    const [answerResult, setAnswerResult] = useState("");
    const [answer,setAnswer] = useState();

    useEffect(()=>{
        api.get('?amount=10&category='+ 9 +'&difficulty=medium&type=multiple').then(res => {
            console.log(res.data)
            setQuestions(res.data.results)
        })
    }, [])

    const onClickAnswer = () => {
        setQuestionNumber(questionNumber + 1);
    }

    const onClickNext = () => {
        setQuestionNumber(questionNumber + 1);
    }
    
    return (
        <div>
            {questionNumber < 10 && (<p>{questionNumber}</p>)}
            {
                /*questions.map((question,index)=>(
                    <div key={index}>
                        <p>{question.question}</p>
                        <button>{question.correct_answer}</button>
                        <button>{question.incorrect_answers[0]}</button>
                        <button>{question.incorrect_answers[1]}</button>
                        <button>{question.incorrect_answers[2]}</button>
                    </div>
                ))*/
                
                questions.length > 0 && questionNumber < 10 && (<div>
                <p>{questions[questionNumber].question}</p>
                <button onClick={onClickAnswer}>{questions[questionNumber].correct_answer}</button>
                <button onClick={onClickAnswer}>{questions[questionNumber].incorrect_answers[0]}</button>
                <button onClick={onClickAnswer}>{questions[questionNumber].incorrect_answers[1]}</button>
                <button onClick={onClickAnswer}>{questions[questionNumber].incorrect_answers[2]}</button>
                <button onClick={onClickNext}>Next Question</button>
                <p>{answerResult}</p>
                 </div>)
            }

            {
                questionNumber >= 10 && (<Link to="/">Go to Main Menu</Link>)
            }
            
        </div>
    )
}

export default QuizQuestion
