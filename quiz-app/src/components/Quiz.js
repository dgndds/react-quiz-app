import axios from 'axios'
import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'

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
            <ul>{categories.map((category)=>(<li key={category.id}>
                <Link to={{
                    pathname:'/question',
                    categoryId:category.id
                }}>{category.name}</Link></li>
            ))}</ul>
        </div>
    )
}

export default Quiz
