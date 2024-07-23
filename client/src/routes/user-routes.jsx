import HomeUserLogin from "../pages/user-profile-management/home-login";
import EditProfilePage from "../pages/user-profile-management/edit-profile-page";
import MerryListPage from "../pages/user-profile-management/merry-list-page";
import Membership from "../pages/user-profile-management/membership";
import MatchingPage from "../components/MatchingPage";
import MerryMembership from "../components/merrymembership";
import PayMentOne from "../components/payment1";
import Payment2Page from "../components/Payment2Page";
import { Routes, Route } from "react-router-dom";
import MatchingChat from "../components/MatchingChat"

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeUserLogin />} />
      <Route path="/profile" element={<EditProfilePage />} />
      <Route path="/merry-list" element={<MerryListPage />} />
      <Route path="/membership" element={<Membership />} />
      <Route path="/matching" element={<MatchingPage />} />
      <Route path="/Membership" element={<MerryMembership />} />
      <Route path="/paymentone" element={<PayMentOne />} />
      <Route path="/payment2" element={<Payment2Page />} />
      <Route path="/user/matchingchat" element={<MatchingChat />} />

    </Routes>
  );
}

export default UserRoutes;
