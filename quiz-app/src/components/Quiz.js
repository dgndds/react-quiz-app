import axios from 'axios'
import React, {useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {ListGroup,Alert,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import '../Style/Quiz.css'

const api = axios.create({
    baseURL:'https://opentdb.com'
})

const Quiz = (props) => {
    
    const [categories,setCategories] = useState([]);

    useEffect(()=>{
        api.get('/api_category.php').then(res => {
            console.log(res.data)
            setCategories(res.data.trivia_categories)
        })
    }, [])

    return (
        <div>
        <Alert variant="dark" className="text-center"><strong>Choose A Category</strong></Alert>
        <ListGroup  variant="flush" className="list">
            {categories.map((category)=>(<ListGroup.Item className="text-center list-item" key={category.id}>
                <Link className="link-text" to={{
                    pathname:'/quizsetup',
                    categoryId:category.id
                }}><Button variant="danger" className="button">{category.name}</Button></Link>
                </ListGroup.Item>
            ))}
        </ListGroup>
        </div>
    )
}

export default Quiz
