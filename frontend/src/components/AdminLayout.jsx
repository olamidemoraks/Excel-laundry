import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Navbar />
      <div className="flex h-full border-t border-t-gray-500">
        <Sidebar />
        <div className="w-full h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
