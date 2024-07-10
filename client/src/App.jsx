import "./App.css";
import Nav from "./nav";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Footer from "./components/Footer";
import Login from "./components/Login";
import MatchingPage from "./components/MatchingPage";

function App() {
  return (
    <>
      <MatchingPage />
    </>
  );
}

export default App