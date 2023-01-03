import React from "react";
import { useParams } from "react-router-dom";
import {
  useGetAllReservationQuery,
  useUpdateStatusMutation,
} from "../features/reservation/allReservationApiSlice";
import useItem from "../hooks/useItem";
import useStatus from "../hooks/useStatus";
import moment from "moment";
import { GoPerson, GoCheck } from "react-icons/go";
import { FiMail, FiCheckCircle, FiX } from "react-icons/fi";
import { FaCalendarDay, FaMapMarked, FaPhoneAlt } from "react-icons/fa";

const SinglePickup = () => {
  const { id: userId } = useParams();
  const { reservation } = useGetAllReservationQuery("AllReservation", {
    selectFromResult: ({ data }) => ({
      reservation: data?.entities[userId],
    }),
  });
  const { bgColor, color, borderColor } = useStatus(reservation.status);
  const { filterReserve } = useItem(reservation);
  const [updateStatus] = useUpdateStatusMutation();

  const updateReservation = async (id, status) => {
    await updateStatus({ id, status });
  };

  return (
    <div className="bg-gray-700 h-full w-full py-10 px-10">
      <div className="border border-gray-600/60 rounded-sm flex p-10">
        <div>
          <p className="text-xl font-bold text-gray-200 mb-2">Items</p>
          <div className="flex flex-wrap gap-2 ">
            {filterReserve.map((item, idx) => (
              <div
                className="p-2 bg-blue-200/20 h-8 flex items-center border border-white rounded-lg gap-2 "
                key={idx}
              >
                {" "}
                <span className="font-bold text-gray-400 capitalize">
                  {Object.keys(item)}
                </span>{" "}
                <span className="text-gray-300 font-semibold">
                  {Object.values(item)}
                </span>{" "}
              </div>
            ))}
          </div>
        </div>
        <div className=" w-full flex flex-col px-3">
          <div className="flex justify-between flex-row items-start">
            <div>
              <p className="text-gray-200 text-2xl font-bold">
                Ticket #{reservation?.receipt}{" "}
              </p>
              <p className="text-gray-300">
                {moment(reservation?.createdAt).format(
                  "MMMM Do YYYY, h:mm:ss a"
                )}
              </p>
            </div>
            <div className="flex justify-end gap-3 items-center">
              <p className="text-lg text-gray-200 font-bold">Status</p>
              <p
                className={`${bgColor} ${color} ${borderColor} border px-2 rounded-sm capitalize`}
              >
                {reservation?.status}
              </p>
            </div>
          </div>

          <div className="flex gap-4 my-3">
            <div className="bg-gray-600/90 rounded-sm px-3 py-1">
              <p className="text-gray-400 font-bold flex items-center gap-1">
                <span>
                  <FaCalendarDay />
                </span>
                Pick Up
              </p>
              <p className="text-gray-400 ">
                {moment(reservation.pickupDate).format("MMM Do yyyy")}
              </p>
              <p className="text-gray-400 ">{reservation.pickupTime}</p>
            </div>
            <div className="bg-gray-600/90 rounded-sm px-3 py-1">
              <p className="text-gray-400 font-bold flex items-center gap-1">
                <span>
                  <FaMapMarked />
                </span>{" "}
                Address
              </p>
              <p className="text-gray-400">{reservation.address}</p>
            </div>
            <div className="bg-gray-600/90 rounded-sm px-3 py-1">
              <p className="text-gray-400 font-bold flex items-center gap-1 capitalize">
                <span>
                  <GoPerson />
                </span>
                {reservation.firstname} {reservation.lastname}
              </p>
              <p className="text-gray-400 flex items-center gap-1">
                <span>
                  <FaPhoneAlt />
                </span>
                {reservation.phonenumber}
              </p>
              <p className="text-gray-400 flex items-center gap-1">
                <FiMail />
                {reservation.email}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <p className="text-gray-300 uppercase">Update Status</p>
            <div className="flex gap-3">
              <button
                className="flex items-center rounded-md gap-1 px-2 py-1 bg-blue-500 text-white hover:bg-blue-600 disabled:hidden"
                onClick={() => updateReservation(reservation.id, "delivered")}
              >
                <span>
                  <FiCheckCircle />
                </span>{" "}
                Delivered
              </button>
              <button
                disabled={
                  reservation.status === ("accepted" || "delivered")
                    ? true
                    : false
                }
                className="flex items-center rounded-md gap-1 px-2 py-1 bg-green-600 text-white hover:bg-green-700 disabled:hidden"
                onClick={() => updateReservation(reservation.id, "accepted")}
              >
                <span>
                  <GoCheck />
                </span>{" "}
                Accept
              </button>
              <button
                disabled={
                  reservation.status === ("rejected" || "delivered")
                    ? true
                    : false
                }
                className="flex items-center rounded-md gap-1 px-2 py-1 bg-red-600 text-white hover:bg-red-800 disabled:hidden"
                onClick={() => updateReservation(reservation.id, "rejected")}
              >
                <span>
                  <FiX />
                </span>{" "}
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePickup;
