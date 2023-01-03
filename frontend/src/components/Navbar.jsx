import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { logout } from "../features/auth/authSlice";
import { FiLogOut } from "react-icons/fi";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { username } = useAuth();
  const dispatch = useDispatch();
  const [sendLogout, { isSuccess }] = useSendLogoutMutation();
  const navigate = useNavigate();

  const logoutHandler = () => {
    sendLogout();
    dispatch(logout());
    navigate("/authenticate");
  };
  return (
    <div className="px-10 bg-gray-800 py-2 flex justify-between lg:px-10">
      <Link to={"/admin"} className="text-xl md:text-2xl font-extrabold">
        <span className="italic text-white">Excel</span>{" "}
        <span className="text-indigo-400">Laundary</span>
      </Link>
      <div className="flex items-center gap-3">
        <Link
          to="/home/profile"
          className="text-sm font-extrabold text-white bg-indigo-500 p-2 w-8 h-8 flex items-center justify-center rounded-full uppercase cursor-pointer"
        >
          {username.substring(0, 1)}
        </Link>
        <p className="text-gray-200 hidden md:block capitalize">
          Welcome {username}
        </p>
        <div className="text-white hover:bg-white hover:text-black hover:rounded-full p-1 text-md ease-linear duration-100">
          <FiLogOut onClick={logoutHandler} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
