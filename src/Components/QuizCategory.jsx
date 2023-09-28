import React from 'react';
import { Link } from 'react-router-dom';

const QuizCategory = () => {
  return (
    <div>
      <h2>Select a Quiz Category:</h2>
      <Link to="/sports">
        <button className="category-button">Sports</button>
      </Link>
      <Link to="/history">
        <button className="category-button">History</button>
      </Link>
      <Link to="/science">
        <button className="category-button">Science</button>
      </Link>
    </div>
  );
};

export default QuizCategory;
