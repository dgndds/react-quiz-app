import {Link,useLocation} from 'react-router-dom';
import React,{useState,useEffect} from 'react'

const QuizSetup = () => {
    
    useEffect(() => {
        setDifficultySelected(difficultySelected);
        setTypeSelected(typeSelected);
        setDifficulty(difficulty);
        setType(type)
       }, []);

    let location = useLocation();
    const categoryId = location.categoryId;

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
        <div>
            <p>Difficulty</p>
            <button onClick={onClickAny}>Any</button>
            <button onClick={onClickDifficulty} value="easy">Easy</button>
            <button onClick={onClickDifficulty} value="medium">Medium</button>
            <button onClick={onClickDifficulty} value="hard">Hard</button>
            
            <p>Type</p>
            <button onClick={onClickAnyType}>Any</button>
            <button onClick={onClickType} value="boolean">True-False</button>
            <button onClick={onClickType} value="multiple">Multiple Choice</button>
            
            {difficultySelected && <p>Selected Difficulty: {difficulty.charAt(0).toUpperCase()+difficulty.slice(1)}</p>}
            {typeSelected && <p>Selected type: {type === "multiple"?"Multiple Choice":"True-False"}</p>}

            {difficultySelected && typeSelected && (
            <Link to={{
                pathname:'/question',
                categoryId: categoryId,
                type: type,
                difficulty: difficulty
            }}>Start Quiz</Link>)}
            
        </div>
    )
}

export default QuizSetup
