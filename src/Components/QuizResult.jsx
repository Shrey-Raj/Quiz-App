import React from 'react';
import { Link } from 'react-router-dom';

const QuizResult = ({score}) => {
  // Get the score from URL parameter
//   const { score } = useParams();
console.log("score = " , score) ; 
  return (
    <div>
      <h1>Quiz Results</h1>
      <p>Your Score: score</p>
      <p>Thank you for playing the quiz!</p>

      <Link to="/">Play Again</Link>
    </div>
  );
};

export default QuizResult;
