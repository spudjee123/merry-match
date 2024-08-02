import { Component } from "react";
import AdminPageSidebar from "./adminsidebar";
import AdminPageList from "./adminlist";

const PackageListPage = () => {
  return (
    <>
      <div className="flex bg-white ">
        <AdminPageSidebar />
        <AdminPageList />
      </div>
    </>
  );
};

export default PackageListPage;
