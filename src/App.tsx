import "./App.css";
import { SurveyPage } from "./pages/Survey/SurveyPage";
import { Routes, Route } from "react-router-dom";
import { ResultsPage } from "./pages/Results/ResultsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SurveyPage />}></Route>
        <Route path="/results" element={<ResultsPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
