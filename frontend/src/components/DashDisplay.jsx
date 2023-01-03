import React from "react";

const DashDisplay = ({ name, total, children }) => {
  return (
    <div className="bg-gray-800/90 w-full h-full flex flex-col px-12 pt-10">
      <div className="text-gray-100 text-xl font-semibold tracking-wide">
        {name} {total ?? null}
      </div>
      <div className="pt-10">{children}</div>
    </div>
  );
};

export default DashDisplay;
