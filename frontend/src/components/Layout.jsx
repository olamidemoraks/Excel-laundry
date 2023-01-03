import React from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
const Layout = () => {
  const { username, isAdmin } = useAuth();
  const dispatch = useDispatch();
  const [sendLogout, { isSuccess }] = useSendLogoutMutation();
  const navigate = useNavigate();

  const logoutHandler = () => {
    sendLogout();
    dispatch(logout());
    navigate("/authenticate");
  };
  return (
    <>
      <div className="px-16 py-8 flex justify-between lg:px-64">
        <Link to={"/home"} className="text-xl md:text-2xl font-extrabold">
          <span className="italic text-gray-600">Excel</span>{" "}
          <span className="text-indigo-500">Laundary</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            to="profile"
            className="text-sm font-extrabold text-white bg-indigo-500 p-2 w-8 h-8 flex items-center justify-center rounded-full uppercase cursor-pointer"
          >
            {username.substring(0, 1)}
          </Link>
          <p className="text-gray-500 hidden md:block capitalize">
            Welcome {username}
          </p>
          {isAdmin ? (
            <Link
              className="bg-indigo-400 text-indigo-100 hover:bg-indigo-500 px-2 rounded-sm"
              to={"/admin"}
            >
              Dashboard
            </Link>
          ) : null}
          <button
            className="border text-indigo-700 border-indigo-300  hover:bg-indigo-500 hover:border-indigo-500 hover:text-white px-2 rounded-sm ease-linear duration-200"
            onClick={logoutHandler}
          >
            Log out
          </button>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
