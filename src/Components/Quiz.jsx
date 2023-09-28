import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import categoryMappings from "./categoryMapping";

const Quiz = () => {
  let { category } = useParams();

  const mappedCategory = categoryMappings[category.toLowerCase()];

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    if (!mappedCategory) {
      setErrorMessage("Category Doesn't Exist or Wrong URL");
      return;
    }

    async function fetchQuestions() {
      try {
        const response = await axios.get(
          `https://opentdb.com/api.php?amount=10&category=${mappedCategory}&difficulty=medium&type=multiple`
        );
        setQuestions(response.data.results);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }

    fetchQuestions();
  }, [mappedCategory]);

  useEffect(() => {
    let intervalId;
  
    if (currentQuestionIndex < questions.length) {
      // Start the timer when a new question is displayed
      setTimer(5);
  
      // Set up a timer that decreases the timer value every second
      intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            // When timer reaches 0, move to the next question
            clearInterval(intervalId);
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            return 60; // Reset the timer to 60 for the next question
          }
        });
      }, 1000);
    } else {
      // End of the quiz
      clearInterval(intervalId);
      // setQuizEnded(true);
    }
  
    return () => {
      // Cleanup: clear the interval when the component unmounts or a new question is displayed
      clearInterval(intervalId);
    };
  }, [currentQuestionIndex, questions]);
  
  

  const handleAnswerClick = (selectedOption) => {
    
    const isCorrect =
      selectedOption === questions[currentQuestionIndex].correct_answer;

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizEnded(true);
    }
  };

  const renderQuestions = () => {
    if (questions.length === 0) {
      return <p>Loading questions...</p>;
    }

    
    const question = questions[currentQuestionIndex];

    return (
      <div>
        <h2>{question.question}</h2>
        <p>Time Left: {timer} seconds</p>
        <ul>
          {question.incorrect_answers.map((option, index) => (
            <div key={index}>
              <button onClick={() => handleAnswerClick(option)}>
                <li>{option}</li>
              </button>
            </div>
          ))}

          <div>
            <button onClick={() => handleAnswerClick(question.correct_answer)}>
              <li>{question.correct_answer}</li>
            </button>
          </div>
        </ul>
      </div>
    );
  };

  return (
    <div>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <>
          <div>
            <h1>Quiz for {mappedCategory}</h1>
            <p>
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
            {quizEnded ? (
              <div>
                <h2>Quiz Ended</h2>
                <p>Your Score: {score}</p>
              </div>
            ) : (
              renderQuestions()
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
