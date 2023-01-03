import React from "react";

const useStatus = (status) => {
  let color = "text-orange-400";
  let bgColor = "bg-orange-200/20";
  let borderColor = "border-orange-400";

  if (status === "waiting") {
    color = "text-orange-300";
    bgColor = "bg-orange-100/20";
    borderColor = "border-orange-300";
  }
  if (status === "accepted") {
    color = "text-green-200";
    bgColor = "bg-green-200/20";
    borderColor = "border-green-400";
  }
  if (status === "delivered") {
    color = "text-white";
    bgColor = "bg-blue-200/20";
    borderColor = "border-blue-400";
  }
  if (status === "rejected") {
    color = "text-red-200";
    bgColor = "bg-red-200/20";
    borderColor = "border-red-400";
  }

  return { color, bgColor, borderColor };
};

export default useStatus;
