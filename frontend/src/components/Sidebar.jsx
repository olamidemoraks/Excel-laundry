import React from "react";
import { FiCodesandbox, FiUser, FiHexagon } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const currentLocation = location.pathname.split("/")[2] ?? "dashboard";

  return (
    <div className="bg-gray-800 w-14 md:w-48 text-white py-32  flex flex-col border-r border-r-gray-500">
      <Link
        to="/admin"
        className={`${
          currentLocation === "dashboard"
            ? "border-r-4 border-indigo-300 bg-gray-700 "
            : ""
        } group flex items-center gap-2 hover:bg-gray-700 w-full pl-4 md:pl-10 py-4 hover:border-r-4 hover:border-indigo-300 ease-liner duration-100`}
      >
        <div>
          <FiHexagon
            className={`${
              currentLocation === "dashboard" ? "text-2xl" : "text-xl"
            } text-xl group-hover:text-2xl`}
          />
        </div>
        <p className="hidden md:block">Dashboard</p>
      </Link>
      <Link
        to="pickup"
        className={`${
          currentLocation === "pickup"
            ? "border-r-4 border-indigo-300 bg-gray-700 "
            : ""
        }  group flex items-center gap-2  hover:bg-gray-700 w-full pl-4 md:pl-10 py-4 hover:border-r-4 hover:border-indigo-300 ease-liner duration-100`}
      >
        <FiCodesandbox
          className={` ${
            currentLocation === "pickup" ? "text-2xl" : "text-xl"
          }  group-hover:text-2xl`}
        />
        <p className="hidden md:block">Pickups</p>
      </Link>
      <Link
        to="users"
        className={`${
          currentLocation === "users"
            ? "border-r-4 border-indigo-300 bg-gray-700 "
            : ""
        }  group flex items-center gap-2  hover:bg-gray-700 w-full pl-4 md:pl-10 py-4 hover:border-r-4 hover:border-indigo-300 ease-liner duration-100`}
      >
        <FiUser
          className={`${
            currentLocation === "users" ? "text-2xl" : "text-xl"
          }  group-hover:text-2xl`}
        />
        <p className="hidden md:block">Users</p>
      </Link>
    </div>
  );
};

export default Sidebar;
