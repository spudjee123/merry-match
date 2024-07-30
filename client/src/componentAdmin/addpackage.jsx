import React from "react";
import AdminPageSidebar from "./adminsidebar";
import AdminAddPackagePage from "./adminaddpackage";

const AddPackagePage = () => {
  return (
    <>
      <div className="flex bg-white">
        <AdminPageSidebar />
        <AdminAddPackagePage />
      </div>
    </>
  );
};

export default AddPackagePage;
