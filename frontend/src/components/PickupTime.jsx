import React, { useState } from "react";
import { timeSetting } from "../utils/date";

const PickupTime = ({ reservation, setReservation }) => {
  const [active, setActive] = useState("");

  return (
    <div className="w-[80%] mx-9 my-4  md:w-[90%] md:mx-0 md:mt-4">
      <p className="font-semibold text-gray-700 ">PickupTime</p>
      <div className="flex overflow-x-auto gap-2 py-4  scrollbar-thin scrollbar-track-indigo-200/50 scrollbar-thumb-indigo-400 scroll-smooth">
        {timeSetting.map((time, idx) => (
          <div
            className={`${
              active === idx ? " text-indigo-500/70 border-indigo-500/70" : ""
            } border text-gray-500 hover:text-indigo-500/70 bg-indigo-100/30 hover:bg-indigo-100/70 hover:border-indigo-500/70 cursor-pointer rounded-md px-2 py-1 ease-linear duration-100  `}
            key={idx}
          >
            <button
              onClick={() => {
                setActive(idx);
                setReservation({ ...reservation, pickupTime: time.name });
              }}
              className="text-sm "
            >
              {time.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PickupTime;
