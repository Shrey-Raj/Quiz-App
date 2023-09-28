import { Routes, Route } from "react-router-dom";
import QuizCategory from "./Components/QuizCategory";
import Quiz from "./Components/Quiz";
import QuizResult from "./Components/QuizResult"
import ErrorPage from "./Components/ErrorPage";

function App() {
  return (
    <>
      <h1>Quiz App</h1>

      <Routes>
          <Route path="/" element={<QuizCategory />} />
          <Route path="/:category" element={<Quiz />}/>
          <Route path="/result" element={<QuizResult />} />
          <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </>
  );
}

export default App;
