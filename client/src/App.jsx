import "./App.css";
import Nav from "./nav";
import LandingPage from "./components/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Nav />} />
          <Route path="/landing" element={<LandingPage />} />
          {/* <Route path="/page" element={<Page />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
