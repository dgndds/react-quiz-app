import React from 'react'

const Scores = () => {
    const onClick = (e) => {
        console.log("Click");
    }

    return (
        <div>
            <p>A</p>
            <p>B</p>
            <p>C</p>
            <p>D</p>
            <a href="/quiz" onClick={onClick}>Start new quiz</a>
        </div>
    )
}

export default Scores
