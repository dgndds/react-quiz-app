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
    const [apiFailed,setApiFailed] = useState(false);

    let location = useLocation();
    const categoryId = location.categoryId;
    const type = location.type;
    const categoryName = location.categoryName
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
        setApiFailed(apiFailed);

        api.get('?amount=10&category='+ categoryId +'&difficulty='+ difficulty +'&type='+type+'').then(res => {
            console.log(res.data)
            console.log('?amount=10&category='+ categoryId +'&difficulty='+difficulty+'&type='+type)
            let returnedQuestions = res.data.results;
            setQuestions(returnedQuestions)
            
            console.log(returnedQuestions);
            console.log(questionNumber);
            let list = returnedQuestions[questionNumber].incorrect_answers.concat(returnedQuestions[questionNumber].correct_answer);
            list = list.sort(() => Math.random() - 0.5);
            setQuestionAnswers(list);
        }).catch((error)=>{
            console.log(error);
            setApiFailed(true);
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

    function decodeHtml(html) {
        let areaElement = document.createElement("textarea");
        areaElement.innerHTML = html;
    
        return areaElement.value;
    }

    return (
        <div className="text-center">
            {!apiFailed && (
                <>
                <Alert variant="light">{categoryName}</Alert>
                {questionNumber < 10 && (<p>{questionNumber + 1}/10</p>)}
                {
                    
                    questions.length > 0 && questionNumber < 10 && 
                    (
                        <div className="text-center" >
                        <div className="text-center">
                            <Card style={{padding:'2%'}}>
                            <Card.Title>{decodeHtml(questions[questionNumber].question)}</Card.Title>
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
                        
                        <Button variant="danger" onClick={onClickNext} style={{marginTop:'2%'}}>Next</Button>
                        {answerResult.length > 0&& <Alert variant="light" style={{marginTop:'3%',width:'%5'}}>{answerResult}</Alert>}
                        </div>
                    )
                }
    
                {
                    questionNumber >= 10 && (
                        <Card>
                            <Card.Title>Results</Card.Title>
                            <Card.Body>
                            <p>Correct Answers:{correctAnswerCount}</p>
                            <p>Wrong Answers:{wrongAnswerCount}</p>
                            <Link to="/"><Button variant="danger">Go to Main Menu</Button></Link>
                            </Card.Body>
                        </Card>
                    )
                }
                </>
            )}

            {apiFailed && (
                <>
                <p style={{marginTop:'5%'}}>API FAILED</p>
                <p>Failed To Retrieve Questions</p>
                <Link to="/"><Button>GO BACK TO MAIN MENU</Button></Link>
                </>
            )}
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