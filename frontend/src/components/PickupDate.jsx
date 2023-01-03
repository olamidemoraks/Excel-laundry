import React, { useState } from "react";
import moment from "moment";
import { dateSetting } from "../utils/date";

const PickupDate = ({ reservation, setReservation }) => {
  dateSetting.map((date) => console.log(date.date));
  const [active, setActive] = useState("");
  return (
    <div className="flex flex-col mx-9 md:mx-0 w-3/4 md:w-full">
      <div className="flex justify-between md:w-[100%]">
        <p className="font-semibold text-gray-700">Pickup date</p>
        <p className="text-indigo-500 font-semibold">
          {moment().format("MMMM")}
        </p>
      </div>
      <div className="flex overflow-x-auto w-[100%] gap-3 mt-3 scrollbar-thin scrollbar-track-indigo-200/50 scrollbar-thumb-indigo-400 scroll-smooth pb-5">
        {dateSetting.map(({ id, main, day, date }) => (
          <button
            onClick={() => {
              setActive(id);
              setReservation({ ...reservation, pickupDate: main });
            }}
            className={`${
              active === id
                ? "font-bold text-indigo-500/70 border-indigo-500/70"
                : ""
            } ${
              moment() <= moment().day(5) && moment() >= moment(main)
                ? "hidden"
                : ""
            }
             p-1 border bg-indigo-100/30 hover:bg-indigo-100/70 hover:border-indigo-500/70 cursor-pointer rounded-md w-12 ease-linear duration-75 text-center`}
            key={id}
          >
            <p className="text-sm ">{day}</p>
            <p>{date.split("th")}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PickupDate;
