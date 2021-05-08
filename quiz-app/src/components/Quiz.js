import axios from 'axios'
import React, {useState,useEffect} from 'react'

const api = axios.create({
    baseURL:'https://opentdb.com'
})

const Quiz = () => {
    
    const [categories,setCategories] = useState([]);

    useEffect(()=>{
        api.get('/api_category.php').then(res => {
            console.log(res.data)
            setCategories(res.data.trivia_categories)
        })
    }, [])

    return (
        <div>
            <div>{categories.map((category)=>(
                <a href="#" key={category.id}>{category.name}</a>
            ))}</div>
        </div>
    )
}

export default Quiz
