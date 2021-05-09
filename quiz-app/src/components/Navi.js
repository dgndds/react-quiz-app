import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Navbar} from 'react-bootstrap'
import '../Style/Navi.css'
import { FaHome,FaDice,FaQuestionCircle,FaUserAlt } from "react-icons/fa";

const Navi = () => {
    return (
        <>
        <Navbar fixed="bottom" bg="dark" variant="dark" className="navbar">
                <Navbar.Text className="link">
                    <FaHome/>
                    <Link className="link-text" to="/">Home</Link>
                </Navbar.Text>
                <Navbar.Text className="link">
                    <FaUserAlt/>
                    <Link className="link-text" to="/profile">Profile</Link>
                </Navbar.Text>
                <Navbar.Text className="link">
                    <FaQuestionCircle/>
                    <Link className="link-text" to="/quiz">Quiz</Link>
                </Navbar.Text>
                <Navbar.Text className="link">
                    <FaDice/>
                    <Link className="link-text" to="/random">Random</Link>
                </Navbar.Text>
        </Navbar>
        </>
    )
}

export default Navi
