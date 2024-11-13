import "./App.css";
import { SurveyPage } from "./pages/Survey/SurveyPage";
import { Routes, Route } from "react-router-dom";
import { ResultsPage } from "./pages/Results/ResultsPage";
import { SuccessPage } from "./pages/Success/SuccessPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SurveyPage />}></Route>
        <Route path="/results" element={<ResultsPage />}></Route>
        <Route path="/success" element={<SuccessPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
