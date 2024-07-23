import PackageListPage from "../component/packagelist";
import AddPackagePage from "../component/addpackage";
import EditPackage from "../component/editpackage";
import { Routes, Route } from "react-router-dom";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/package/add" element={<AddPackagePage />} />
      <Route path="/package/view" element={<PackageListPage />} />
      <Route path="/package/edit/:package_id" element={<EditPackage />} />
    </Routes>
  );
}

export default AdminRoutes;
