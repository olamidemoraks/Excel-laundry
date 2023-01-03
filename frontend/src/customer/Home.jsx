import React from "react";
import imagelogo from "../assets/homelogo.png";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-500 via-purple-500 pt-5 md:pt-0 px-12 to-indigo-500 h-screen flex flex-col md:flex-row items-center ">
      <div className="flex-1">
        <img src={imagelogo} alt="logo" />
      </div>
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-gray-100 text-3xl uppercase font-bold tracking-wide p-2">
          Excel Laundry App
        </h1>
        <p className="tracking-wide text-slate-200 px-7 md:p-2 pb-3 lg:w-1/2">
          Get ready to make your life easy with single click of app, which makes
          laundry things handle better.
        </p>
        <Link
          className="bg-orange-400 text-gray-100 px-3 md:ml-2  py-2 rounded-md uppercase text-[10px] font-bold"
          to={"/home"}
        >
          get started
        </Link>
      </div>
    </div>
  );
};

export default Home;
