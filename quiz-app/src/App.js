import React, {useState} from "react";
import Navi from './components/Navi'
import Scores from './components/Scores'
import RandomQuiz from './components/RandomQuiz'
import Quiz from './components/Quiz'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import QuizQuestion from './components/QuizQuestion'

function App() {
  const [userScore, setUserScore] = useState(0);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact><Scores userScore={userScore}></Scores></Route>
          <Route path="/quiz" component={Quiz}/>
          <Route path="/random" component={RandomQuiz}/>
          <Route path="/question" component={QuizQuestion}><QuizQuestion setUserScore={setUserScore} userScore={userScore}/></Route>
        </Switch>
        <Navi/>
      </div>
    </Router>
  );
}

export default App;

/**<Route path="/quiz" render={()=>{
            <><Quiz/></>
          }

          }/> 
          
          <div>{userScore}</div>
          */
