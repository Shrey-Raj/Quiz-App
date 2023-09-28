import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quiz = ({ match }) => {
  let { category } = match.params;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {

    if(category==='sports') category='21' ; 
    else if(category==='science') category='17';
    else category = '23' ;

    // Fetch quiz questions from the provided API for the selected category
    const apiUrl = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=medium&type=multiple`;

    axios.get(apiUrl)
      .then((response) => {
        setQuestions(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, [category]);

  const handleAnswerSubmit = (selectedAnswer) => {
    // Check if the selected answer is correct and update the score
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correct_answer) {
      setScore(score + 1);
    }

    // Move to the next question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // End of the quiz
      // Redirect to the results page or display a "Play Again" button
      // You can implement this logic based on your design
    }
  };

  return (
    <div>
      <h2>{category} Quiz</h2>
      {questions.length > 0 && currentQuestionIndex < questions.length ? (
        <div>
          <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
          <p>{questions[currentQuestionIndex].question}</p>
          <ul>
            {questions[currentQuestionIndex].incorrect_answers.map((answer) => (
              <li key={answer}>
                <button onClick={() => handleAnswerSubmit(answer)}>{answer}</button>
              </li>
            ))}
            <li key={questions[currentQuestionIndex].correct_answer}>
              <button onClick={() => handleAnswerSubmit(questions[currentQuestionIndex].correct_answer)}>
                {questions[currentQuestionIndex].correct_answer}
              </button>
            </li>
          </ul>
        </div>
      ) : (
        // Display a message or redirect to the results page
        <p>Loading questions...</p>
      )}
    </div>
  );
};

export default Quiz;
