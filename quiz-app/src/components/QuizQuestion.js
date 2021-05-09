import axios from 'axios'
import React, {useState,useEffect} from 'react'
import {Link,useLocation} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {ButtonGroup,Button,Card,Alert} from 'react-bootstrap'

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
    const [questionAnswers,setQuestionAnswers] = useState([]);

    let location = useLocation();
    const categoryId = location.categoryId;
    const type = location.type;
    const difficulty = location.difficulty
    const userScore = props.userScore

    useEffect(()=>{

        setQuestions(questions);
        setQuestionNumber(questionNumber);
        setCorrectCount(correctAnswerCount);
        setWrongCount(wrongAnswerCount);
        setAnswerResult(answerResult);
        setDisabled(disabled);
        setQuestionAnswers(questionAnswers);

        api.get('?amount=10&category='+ categoryId +'&difficulty='+ difficulty +'&type='+type+'').then(res => {
            console.log(res.data)
            console.log('?amount=10&category='+ categoryId +'&difficulty='+difficulty+'&type='+type)
            let questions1 = res.data.results;
            setQuestions(questions1)
            
            console.log(questions1);
            console.log(questionNumber);
            let list = questions1[questionNumber].incorrect_answers.concat(questions1[questionNumber].correct_answer);
            list = list.sort(() => Math.random() - 0.5);
            setQuestionAnswers(list);
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
        }else{
            let list = questions[questionNumber+1].incorrect_answers.concat(questions[questionNumber+1].correct_answer);
            list = list.sort(() => Math.random() - 0.5);
            setQuestionAnswers(list);
        }
    }

    return (
        <div className="text-center">
            {questionNumber < 10 && (<p>{questionNumber + 1}/10</p>)}
            {
                
                questions.length > 0 && questionNumber < 10 && 
                (
                    <div className="text-center" >
                    <div className="text-center">
                        <Card style={{padding:'2%'}}>
                        <Card.Title>{questions[questionNumber].question}</Card.Title>
                        <Card.Body>
                        {
                        type === "multiple"  && (
                        <ButtonGroup vertical>
                            <Button onClick={onClickAnswer} value={questionAnswers[0]} disabled={disabled}>{questionAnswers[0]}</Button>
                            <Button onClick={onClickAnswer} value={questionAnswers[1]} disabled={disabled}>{questionAnswers[1]}</Button>
                            <Button onClick={onClickAnswer} value={questionAnswers[2]} disabled={disabled}>{questionAnswers[2]}</Button>
                            <Button onClick={onClickAnswer} value={questionAnswers[3]} disabled={disabled}>{questionAnswers[3]}</Button>
                        </ButtonGroup>)}

                        {type === "boolean" && (
                        <ButtonGroup>
                            <Button onClick={onClickAnswer} value={"True"} disabled={disabled}>True</Button>
                            <Button onClick={onClickAnswer} value={"False"} disabled={disabled}>False</Button>
                        </ButtonGroup>
                        )}
                        </Card.Body>
                        </Card>

                        
                    </div>
                    
                    <Button onClick={onClickNext} style={{marginTop:'2%'}}>Next</Button>
                    <Alert variant="light" style={{marginTop:'3%',width:'%5'}}>{answerResult}</Alert>
                    </div>
                )
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

/**
 * <button onClick={onClickAnswer} value={questions[questionNumber].correct_answer} disabled={disabled}>{questions[questionNumber].correct_answer}</button>
                    <button onClick={onClickAnswer} value={questions[questionNumber].incorrect_answers[0]} disabled={disabled}>{questions[questionNumber].incorrect_answers[0]}</button>
                    <button onClick={onClickAnswer} value={questions[questionNumber].incorrect_answers[1]} disabled={disabled}>{questions[questionNumber].incorrect_answers[1]}</button>
                    <button onClick={onClickAnswer} value={questions[questionNumber].incorrect_answers[2]} disabled={disabled}>{questions[questionNumber].incorrect_answers[2]}</button>

                    <button onClick={onClickAnswer} value={questionAnswers[0]} disabled={disabled}>{questionAnswers[0]}</button>
                    <button onClick={onClickAnswer} value={questionAnswers[1]} disabled={disabled}>{questionAnswers[1]}</button>
                    <button onClick={onClickAnswer} value={questionAnswers[2]} disabled={disabled}>{questionAnswers[2]}</button>
                    <button onClick={onClickAnswer} value={questionAnswers[3]} disabled={disabled}>{questionAnswers[3]}</button>
 */