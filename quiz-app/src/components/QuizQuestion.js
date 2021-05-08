import axios from 'axios'
import React, {useState,useEffect} from 'react'
import {Link,useLocation} from 'react-router-dom'

const api = axios.create({
    baseURL:'https://opentdb.com/api.php'
})

const QuizQuestion = (props) => {
    const [questions,setQuestions] = useState([]);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [correctAnswerCount, setCorrectCount] = useState(0);
    const [wrongAnswerCount, setWrongCount] = useState(0);
    const [answerResult, setAnswerResult] = useState("");
    const [disabled, setDisabled] = useState(false);

    let location = useLocation();
    //const setUserScore = props.history.location.state;
    const categoryId = location.categoryId;
    const type = location.type;
    const difficulty = location.difficulty
    const userScore = props.userScore

    useEffect(()=>{
        console.log(userScore)
        api.get('?amount=10&category='+ categoryId +'&difficulty='+ difficulty +'&type='+type+'').then(res => {
            console.log(res.data)
            console.log('?amount=10&category='+ categoryId +'&difficulty='+difficulty+'&type='+type)
            setQuestions(res.data.results)
        })
    }, [])

    const onClickAnswer = (e) => {
        const answer = e.target.value;

        if(answer === questions[questionNumber].correct_answer){
            setAnswerResult("Correct");
            setCorrectCount(correctAnswerCount + 1);
        }else{
            setAnswerResult("Wrong");
            setWrongCount(wrongAnswerCount + 1);
        }

        setDisabled(true);   
    }

    const onClickNext = () => {
        setAnswerResult("");
        setDisabled(false);
        setQuestionNumber(questionNumber + 1);

        if(questionNumber + 1 >= 10){
            props.setUserScore(userScore + correctAnswerCount);
        }
    }
    
    return (
        <div>
            {questionNumber < 10 && (<p>{questionNumber + 1}/10</p>)}
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
                
                questions.length > 0 && questionNumber < 10 && (
                
                <div>
                <p>{questions[questionNumber].question}</p>

                {type === "multiple" && (
                <>
                    <button onClick={onClickAnswer} value={questions[questionNumber].correct_answer} disabled={disabled}>{questions[questionNumber].correct_answer}</button>
                    <button onClick={onClickAnswer} value={questions[questionNumber].incorrect_answers[0]} disabled={disabled}>{questions[questionNumber].incorrect_answers[0]}</button>
                    <button onClick={onClickAnswer} value={questions[questionNumber].incorrect_answers[1]} disabled={disabled}>{questions[questionNumber].incorrect_answers[1]}</button>
                    <button onClick={onClickAnswer} value={questions[questionNumber].incorrect_answers[2]} disabled={disabled}>{questions[questionNumber].incorrect_answers[2]}</button>
                </>)}

                {type === "boolean" && (
                <>
                    <button onClick={onClickAnswer} value={"True"} disabled={disabled}>True</button>
                    <button onClick={onClickAnswer} value={"False"} disabled={disabled}>False</button>
                </>
                )}
                <button onClick={onClickNext}>Next Question</button>
                <p>{answerResult}</p>
                 </div>)
            }

            {
                questionNumber >= 10 && (
                    <div>
                        <p>Correct Answers:{correctAnswerCount}</p>
                        <p>Wrong Answers:{wrongAnswerCount}</p>
                        <Link to="/">Go to Main Menu</Link>
                    </div>
                )
            }
            
        </div>
    )
}

export default QuizQuestion
