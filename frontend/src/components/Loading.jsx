import React from "react";
import { BeatLoader } from "react-spinners";

const Loading = ({ bgColor }) => {
  return (
    <div
      className={`${
        bgColor ? bgColor : "bg-indigo-700"
      } h-screen flex items-center justify-center`}
    >
      <BeatLoader color="white" />
    </div>
  );
};

export default Loading;
