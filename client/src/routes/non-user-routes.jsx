import LandingPage from "../components/landing-page";
import Login from "../components/Login";
import RegisterPage from "../pages/non-user/register-page";
import NotFoundPage from "../pages/NotFoundPage";
import { Routes, Route } from "react-router-dom";

function NonUserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default NonUserRoutes;
