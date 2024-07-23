import LandingPage from "../components/landing-page";
import Login from "../components/Login";
import RegisterPage from "../pages/non-user/register-page";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function NonUserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default NonUserRoutes;
