import {Link} from 'react-router-dom';
import axios from 'axios';
import React,{useState,useEffect} from 'react';

const api = axios.create({
    baseURL:'https://opentdb.com'
})

const RandomQuiz = () => {
    const [categories,setCategories] = useState([]);
    const [loaded,setLoaded] = useState(false);

    const difficulties = ["easy","medium","hard"];
    const types = ["multiple","boolean"];

    const [difficulty,setDifficulty] = useState(difficulties[Math.floor(Math.random() * difficulties.length)]);
    const [type,setType] = useState(types[Math.floor(Math.random() * types.length)]);
    const [categoryId,setCategoryId] = useState(Math.floor(Math.random() * (32 - 9 + 1)) + 9); 

    useEffect(()=>{
        setCategories(categories);
        setDifficulty(difficulty);
        setType(type);
        setCategoryId(categoryId);
        api.get('/api_category.php').then(res => {
            console.log(res.data)
            setCategories(res.data.trivia_categories);
            setLoaded(true)
        })
    }, [])

    const onClickReroll = () => {
        setDifficulty(difficulties[Math.floor(Math.random() * difficulties.length)]);
        setType(types[Math.floor(Math.random() * types.length)]);
        setCategoryId(Math.floor(Math.random() * (32 - 9 + 1)) + 9);
    }

    return (
        <div>
            <p>Category:{loaded&&categories[categoryId - 9].name}</p>
            <p>Difficulty: {difficulty}</p>
            <p>Type: {type}</p>
            <button onClick={onClickReroll}>Reroll</button>
            <Link to={{
                pathname:'/question',
                categoryId: categoryId,
                type: type,
                difficulty: difficulty
            }}>Start Quiz</Link>
        </div>
    )
}

export default RandomQuiz
