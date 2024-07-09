import "./App.css";
import Nav from "./nav";
import EditProfilePage from "./pages/user-profile-management/edit-profile-page.jsx";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Nav />} />
          <Route path="/user/:userId/edit" element={<EditProfilePage />} />

          {/* <Route path="/page" element={<Page />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
