import "./App.css";
import Nav from "./nav";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Footer from "./components/Footer";
import Login from "./components/Login";
import MatchingPage from "./components/MatchingPage";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import PackageListPage from "./component/packagelist";
import AddPackagePage from "./component/addpackage";
import EditPackage from "./component/editpackage";
import EditProfilePage from "./pages/user-profile-management/edit-profile-page.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Nav />} />
          <Route path="/package/add" element={<AddPackagePage />} />
          <Route path="/package/view" element={<PackageListPage />} />
          <Route path="/package/edit" element={<EditPackage />} />
          <Route path="/user/:userId/edit" element={<EditProfilePage />} />

          {/* <Route path="/page" element={<Page />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
