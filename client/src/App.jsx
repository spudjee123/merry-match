import "./App.css";
import Nav from "./nav";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Footer from "./components/Footer";
import Login from "./components/Login";
import MatchingPage from "./components/MatchingPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Nav />} />

          {/* <Route path="/page" element={<Page />} /> */}
          <MatchingPage />
        </Routes>
      </BrowserRouter>
    </>
  );
}
