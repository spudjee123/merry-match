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
import MerryMembership from "./components/merrymembership.jsx";
import PayMentOne from "./components/payment1.jsx";
import Payment2Page from "./components/Payment2Page.jsx";
import ComplainList from "./component/complainlist.jsx";
import SeeComplaintDetail from "./component/seecomplaint.jsx";
import MatchingChat from "../src/components/MatchingChat.jsx"
import ComplaintPage from "./components/ComplaintPage.jsx";
import { useAuth } from "./context/auth.jsx";
import NonUserRoutes from "./routes/non-user-routes.jsx";
import UserRoutes from "./routes/user-routes.jsx";
import AdminRoutes from "./routes/admin-routes.jsx";

function App() {
  const { isAuthenticated, state } = useAuth();

console.log(state);

  return (
    <>
     
       {(!isAuthenticated) ? (
        <NonUserRoutes />
      ) : state.user.role === "admin" ? (
        <AdminRoutes />
      ) : (
        <UserRoutes />
      )} 

      {/*<Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/package/add" element={<AddPackagePage />} />
        <Route path="/package/view" element={<PackageListPage />} />
        <Route path="/package/edit/:package_id" element={<EditPackage />} />
        <Route path="/user/:userId/edit" element={<EditProfilePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/page" element={<NavUser />} />
        <Route path="/home-login" element={<HomeUserLogin />} />
        <Route path="/user/:userId/merry-list" element={<MerryListPage />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/matching" element={<MatchingPage />} />
        <Route path="/user/Membership" element={<MerryMembership />} />
        <Route path="/user/payment1" element={<PayMentOne />} />
        <Route path="/user/payment2" element={<Payment2Page />} />
        <Route path="/user/matchingchat" element={<MatchingChat />} />
        <Route path="/user/complaint" element={<ComplaintPage />} />
        <Route path="/complaint/list" element={<ComplainList />} />
        <Route path="/complaint/see" element={<SeeComplaintDetail />} />
      </Routes> */}
    </>
  );
}
export default App;
