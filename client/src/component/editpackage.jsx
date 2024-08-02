import { Component } from "react";
import AdminPageSidebar from "./adminsidebar";
import AdminEditPackagePage from "./adminedit";

const EditPackage = () => {
  return (
    <>
      <div className="flex bg-white ">
        <AdminPageSidebar />
        <AdminEditPackagePage />
      </div>
    </>
  );
};

export default EditPackage;
