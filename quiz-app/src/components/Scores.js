import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Card,ListGroup,Alert,Button} from 'react-bootstrap'
import person1 from '../images/person1.jpeg'
import person2 from '../images/person2.jpg'
import person3 from '../images/person3.jpg'
import '../Style/Scores.css'

const Scores = (props) => {
    const [friendNames] = useState(["Tom","Jack","Lora","Lucas","James","Sheva","Ali","Ayşe","Alva","Jerrie","Bud","Ariel","Hardy","Katie","Kristopher","Rickey"]);

    const onClick = (e) => {
        console.log("Click");
    }

    return (
        <div className="text-center">
            <Alert variant="dark" className="justify-content-center text-center alert"><strong>Welcome Back,{friendNames[Math.floor(Math.random() * friendNames.length)]}!</strong></Alert>
            <ListGroup className="align-items-center">
                <ListGroup.Item variant="dark">
                <Card className="card">
                    <Card.Img variant="top" src={person1} className="image"/>
                    <Card.Body>
                        <Card.Title>You</Card.Title>
                        <Card.Text>{props.userScore}</Card.Text>
                    </Card.Body>
                </Card>
                </ListGroup.Item>
                <ListGroup.Item variant="dark" >
                <Card className="card">
                    <Card.Img variant="top" src={person2} className="image"/>
                    <Card.Body>
                        <Card.Title>{friendNames[Math.floor(Math.random() * friendNames.length)]}</Card.Title>
                        <Card.Text>{Math.floor(Math.random() * 100)}</Card.Text>
                    </Card.Body>
                </Card>
                </ListGroup.Item>
                <ListGroup.Item variant="dark" >
                <Card className="card">
                    <Card.Img variant="top" src={person3} className="image"/>
                    <Card.Body>
                        <Card.Title>{friendNames[Math.floor(Math.random() * friendNames.length)]}</Card.Title>
                        <Card.Text>{Math.floor(Math.random() * 100)}</Card.Text>
                    </Card.Body>
                </Card>
                </ListGroup.Item>
            </ListGroup> 
            <Button variant="danger" className="button"><Link className="link-text" to="/quiz" onClick={onClick}>Start new quiz</Link></Button> 
        </div>
    )
}

export default Scores
