import {Link} from 'react-router-dom'

const Navi = () => {
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/quiz">Quiz</Link>
            <Link to="/random">Random</Link>
        </div>
    )
}

export default Navi
