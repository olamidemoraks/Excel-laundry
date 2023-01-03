import React from "react";
import { Link } from "react-router-dom";
const Card = ({ header, subHeader, icon, link }) => {
  return (
    <Link
      to={link}
      className="my-auto mx-10 shadow-md p-9 rounded-md text-center relative hover:shadow-lg hover:p-12 ease-linear duration-150 bg-gray-50"
    >
      {icon || ""}
      <h1 className="text-md font-semibold uppercase tracking-wide text-gray-700 p-2">
        {header}
      </h1>
      <p className="text-sm text-gray-500">{subHeader}</p>
    </Link>
  );
};

export default Card;
