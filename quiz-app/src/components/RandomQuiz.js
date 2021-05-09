import {Link} from 'react-router-dom';
import axios from 'axios';
import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Alert,Card,Button,Container,Row} from 'react-bootstrap'

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

    let  categoryName = loaded&&categories[categoryId - 9].name;

    useEffect(()=>{
        setCategories(categories);
        setDifficulty(difficulty);
        setType(type);
        setCategoryId(categoryId);
        api.get('/api_category.php').then(res => {
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
        <div className="text-center" >
            <Container fluid>
                <Row>
                    <Alert variant="light" className="text-center"><strong>Random Setup</strong></Alert>
                </Row>
                <Row>
                    <Card style={{width:'50%',marginLeft:'auto',marginRight:'auto'}}>
                        <Card.Body>
                            <p>Category:{loaded&&categories[categoryId - 9].name}</p>
                            <p>Difficulty: {difficulty}</p>
                            <p>Type: {type}</p>
                            <Button variant="danger" onClick={onClickReroll}>Reroll</Button>
                        </Card.Body>
                    </Card>
                </Row>
                <Row>
                    <Link to={{
                    pathname:'/question',
                    categoryId: categoryId,
                    type: type,
                    difficulty: difficulty,
                    categoryName: categoryName
                    }}><Button variant="danger" style={{marginTop:'2%'}}>Start Quiz</Button></Link>
                </Row>
            </Container>
        </div>
    )
}

export default RandomQuiz
