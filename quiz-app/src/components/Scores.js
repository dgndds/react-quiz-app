import React, {useState} from 'react'
import {Link} from 'react-router-dom'

const Scores = (props) => {
    const [friendNames] = useState(["Tom","Jack","Lora","Lucas","James","Sheva","Ali","Ayşe","Alva","Jerrie","Bud","Ariel","Hardy","Katie","Kristopher","Rickey"]);

    const onClick = (e) => {
        console.log("Click");
    }

    return (
        <div>
            <div><p>You</p><p>{props.userScore}</p></div>
            <div><p>{friendNames[Math.floor(Math.random() * friendNames.length)]}</p><p>{Math.floor(Math.random() * 100)}</p></div>
            <div><p>{friendNames[Math.floor(Math.random() * friendNames.length)]}</p><p>{Math.floor(Math.random() * 100)}</p></div>
            <div><p>{friendNames[Math.floor(Math.random() * friendNames.length)]}</p><p>{Math.floor(Math.random() * 100)}</p></div>
            <div><p>{friendNames[Math.floor(Math.random() * friendNames.length)]}</p><p>{Math.floor(Math.random() * 100)}</p></div>
            <Link to="/quiz" onClick={onClick}>Start new quiz</Link>
        </div>
    )
}

export default Scores
