import React from 'react'
import {Link} from 'react-router-dom'

const Scores = (props) => {
    const onClick = (e) => {
        console.log("Click");
    }

    return (
        <div>
            <p>{props.userScore}</p>
            <p>B</p>
            <p>C</p>
            <p>D</p>
            <Link to="/quiz" onClick={onClick}>Start new quiz</Link>
        </div>
    )
}

export default Scores
