import PackageListPage from "../component/packagelist";
import AddPackagePage from "../component/addpackage";
import EditPackage from "../component/editpackage";
import ComplainList from "../component/complainlist.jsx";
import SeeComplaintDetail from "../component/seecomplaint.jsx";
import ComplaintResolved from "../component/complaintresolved.jsx"
import ComplaintCancel from "../component/cancelcomplaint.jsx"
import NotFoundPage from "../pages/NotFoundPage";
import { Routes, Route } from "react-router-dom";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/package/add" element={<AddPackagePage />} />
      <Route path="/package/view" element={<PackageListPage />} />
      <Route path="/package/edit/:package_id" element={<EditPackage />} />
      <Route path="/complaint/list" element={<ComplainList />} />
      <Route path="/complaint/see/:complaint_id" element={<SeeComplaintDetail />} />
      <Route path="/complaint/resolved" element={<ComplaintResolved />} />
      <Route path="/complaint/cancel" element={<ComplaintCancel />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AdminRoutes;
