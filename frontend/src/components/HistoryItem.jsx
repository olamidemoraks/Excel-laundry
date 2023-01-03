import React, { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import {
  useGetUserReservationQuery,
  useRemoveReservationMutation,
} from "../features/reservation/reservationApiSclice";
import moment from "moment";
import useStatus from "../hooks/useStatus";
import { FaTrashAlt } from "react-icons/fa";

const initialData = {
  tShirt: 0,
  trouser: 0,
  shirt: 0,
  suit: 0,
  sweater: 0,
  blouse: 0,
  jeans: 0,
  jacket: 0,
};

const HistoryItem = ({ reserveId }) => {
  const [category, setCategory] = useState([]);

  const { reservation } = useGetUserReservationQuery("userReservation", {
    selectFromResult: ({ data }) => ({
      reservation: data?.entities[reserveId],
    }),
  });
  const { color, bgColor, borderColor } = useStatus(reservation?.status);

  const [removeReservation] = useRemoveReservationMutation();

  const removeZero = useCallback(
    (item) =>
      Object.keys(item)
        .filter((key) => item[key] !== 0)
        .reduce(
          (newObj, key) => ({
            ...newObj,
            [key]: item[key],
          }),
          {}
        ),
    []
  );

  useEffect(() => {
    let items;
    //merge the similar fields
    let res = Object.keys(initialData).reduce((newObj, x) => {
      newObj[x] = reservation[x];
      return newObj;
    }, {});
    //remove and field with values of 0
    const data = removeZero(res);
    items = Object.entries(data).map((item) => {
      return { [item[0]]: item[1] };
    });
    setCategory(items);
  }, [reservation]);

  const deleteHandler = async (id) => {
    await removeReservation({ id });
  };

  return (
    <div className="group shadow-md relative flex flex-col justify-between bg-gray-100 rounded-md">
      <button
        className="absolute top-0 right-0 bg-gray-300 px-[6px] py-1 hover:bg-red-400 ease-linear duration-100  hidden group-hover:block text-gray-700 hover:text-red-200"
        onClick={() => deleteHandler(reservation.id)}
      >
        <FaTrashAlt />
      </button>
      <div className="flex flex-wrap gap-2 my-2 p-3">
        {category.map((item, idx) => (
          <div
            className="border px-2 text-sm bg-indigo-100 border-gray-200 flex items-center gap-2 text-indigo-500 rounded-lg capitalize"
            key={idx}
          >
            <span>{Object.keys(item)}</span>
            <span className="bg-indigo-400 h-[13px] w-[13px] font-bold text-[10px] rounded-full text-indigo-100 flex items-center justify-center ">
              {Object.values(item)}
            </span>
          </div>
        ))}
      </div>
      <div className="bg-indigo-600  w-full mt-2 flex justify-between px-3 py-2 rounded-b-md">
        <div className="flex flex-col gap-1">
          <p className="text-indigo-200 font-semibold">
            Pick up: {moment(reservation.pickupDate).format("ddd Do")}
          </p>
          <p className="text-indigo-200 ">by: {reservation.pickupTime}</p>
        </div>
        <div>
          <p className="text-indigo-200 text-sm text-right">
            {moment(reservation.createdAt).fromNow("D")}
          </p>
          <div
            className={`capitalize border-2 mt-2  rounded-md px-2 ${
              color + " " + bgColor + " " + borderColor
            }  
            `}
          >
            {reservation.status}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;
