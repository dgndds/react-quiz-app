//import React, {useState} from "react";
import Navi from './components/Navi'
import Scores from './components/Scores'
import RandomQuiz from './components/RandomQuiz'
import Quiz from './components/Quiz'

function App() {

  return (
    <div className="App">
      <Quiz/>
      <Navi/>
    </div>
  );
}

export default App;
