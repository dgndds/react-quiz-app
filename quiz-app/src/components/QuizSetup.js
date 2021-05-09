import {Link,useLocation} from 'react-router-dom';
import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {ButtonGroup,Button,Alert} from 'react-bootstrap'
import '../Style/QuizSetup.css'

const QuizSetup = () => {
    
    useEffect(() => {
        setDifficultySelected(difficultySelected);
        setTypeSelected(typeSelected);
        setDifficulty(difficulty);
        setType(type)
       }, []);

    let location = useLocation();
    const categoryId = location.categoryId;
    const categoryName = location.categoryName;

    const [difficultySelected,setDifficultySelected] = useState(false);
    const [typeSelected,setTypeSelected] = useState(false);
    const [difficulties] = useState(["easy","medium","hard"]);
    const [types] = useState(["multiple","boolean"]);
    const [difficulty,setDifficulty] = useState("");
    const [type,setType] = useState("");

    const onClickAny = (e) => {
        setDifficultySelected(true);
        setDifficulty(difficulties[Math.floor(Math.random() * difficulties.length)]);
    }

    const onClickDifficulty = (e) => {
        setDifficultySelected(true);
        setDifficulty(e.target.value);
    }

    const onClickAnyType = (e) => {
        setTypeSelected(true);
        setType(types[Math.floor(Math.random() * types.length)]);
    }

    const onClickType= (e) => {
        setTypeSelected(true);
        setType(e.target.value);
    }

    return (
        <div className="text-center">
            <Alert variant="dark"><strong>Setup Quiz</strong></Alert>
            <p className="title">Difficulty</p>
            <ButtonGroup vertical className="button">
                <Button variant="danger" onClick={onClickAny}>Any</Button>
                <Button variant="danger" onClick={onClickDifficulty} value="easy">Easy</Button>
                <Button variant="danger" onClick={onClickDifficulty} value="medium">Medium</Button>
                <Button variant="danger" onClick={onClickDifficulty} value="hard">Hard</Button>
            </ButtonGroup>
            
            
            <p className="title">Type</p>
            <ButtonGroup vertical  className="button">
                <Button variant="danger" onClick={onClickAnyType}>Any</Button>
                <Button variant="danger" onClick={onClickType} value="boolean">True-False</Button>
                <Button variant="danger" onClick={onClickType} value="multiple">Multiple Choice</Button>
            </ButtonGroup>  
            
            {difficultySelected && <p className="info">Selected Difficulty: {difficulty.charAt(0).toUpperCase()+difficulty.slice(1)}</p>}
            {typeSelected && <p className="info">Selected type: {type === "multiple"?"Multiple Choice":"True-False"}</p>}

            {difficultySelected && typeSelected && (
            <Link to={{
                pathname:'/question',
                categoryId: categoryId,
                categoryName:categoryName,
                type: type,
                difficulty: difficulty
            }}><Button variant="danger">Start Quiz</Button></Link>)}
        </div>
    )
}

export default QuizSetup
