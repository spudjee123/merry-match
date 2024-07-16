import "./App.css";
import LandingPage from "./components/landing-page.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Login from "./components/Login";
import MatchingPage from "./components/MatchingPage";
import PackageListPage from "./component/packagelist";
import AddPackagePage from "./component/addpackage";
import EditPackage from "./component/editpackage";
import EditProfilePage from "./pages/user-profile-management/edit-profile-page.jsx";
import RegisterPage from "./pages/non-user/register-page.jsx";
import NavUser from "./pages/user-profile-management/navUser.jsx";
import HomeUserLogin from "./pages/user-profile-management/home-login.jsx";
import MerryListPage from "./pages/user-profile-management/merry-list-page.jsx";
import Membership from "./pages/user-profile-management/membership.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/package/add" element={<AddPackagePage />} />
          <Route path="/package/view" element={<PackageListPage />} />
          <Route path="/package/edit/:package_id" element={<EditPackage />} />
          <Route path="/user/:userId/edit" element={<EditProfilePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/page" element={<NavUser />} />
          <Route path="/home-login" element={<HomeUserLogin />} />
<<<<<<< HEAD
          <Route path="/user/:userId/merry-list" element={<MerryListPage />} />
          <Route path="/membership" element={<Membership />} />
=======
          <Route path="/matching" element={<MatchingPage />} />
>>>>>>> 16dc58e (wik:matching first commit)
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
