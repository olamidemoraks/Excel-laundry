import React, { useEffect, useState } from "react";
import ClothList from "../components/ClothList";
import PickupDate from "../components/PickupDate";
import PickupTime from "../components/PickupTime";
import { setCredential } from "../features/auth/authSlice";
import { GoLocation } from "react-icons/go";
import { FaCaretRight, FaCalendarCheck } from "react-icons/fa";
import { items } from "../utils/item";
import { Link, useNavigate } from "react-router-dom";
import { useAddReservationMutation } from "../features/reservation/reservationApiSclice";

const initialData = {
  tShirt: 0,
  trouser: 0,
  shirt: 0,
  suit: 0,
  sweater: 0,
  blouse: 0,
  jeans: 0,
  jacket: 0,
  pickupDate: null,
  pickupTime: "",
};

const Reservation = () => {
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(initialData);
  const [addReservation, { isLoading, isSuccess, isError, error }] =
    useAddReservationMutation();
  const [error2, setError2] = useState("");

  const checkItem = (items) =>
    Object.keys(items)
      .filter((key) => items[key] >= 1)
      .reduce((newObj, key) => {
        newObj[key] = items[key];
        return newObj;
      }, {});

  const saveReservation = async () => {
    if (Object.keys(checkItem(reservation)).length === 0) {
      setError2("Please select an item");
    } else {
      await addReservation(reservation);
    }
  };

  useEffect(() => {
    if (isError) setError2(error?.data?.message);
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/home/history");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="md:mx-8 flex flex-col-reverse mt-4 md:flex-row gap-8 justify-center lg:mx-[100px]">
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 mx-5 md:mx-0 md:w-full max-[350px]:grid-cols-1">
        {items.map((item, idx) => (
          <ClothList
            key={idx}
            item={item}
            reservation={reservation}
            setReservation={setReservation}
          />
        ))}
      </div>
      <div className=" lg:ml-20 lg:flex-1 flex flex-col md:flex-col md:w-1/3">
        <Link
          to="profile"
          className="flex items-center gap-3 mb-2 mx-8 md:mx-0"
        >
          <GoLocation className="text-indigo-400" /> Behind modern market{" "}
          <FaCaretRight className=" ml-3 text-indigo-600" />
        </Link>
        <PickupDate reservation={reservation} setReservation={setReservation} />
        <PickupTime reservation={reservation} setReservation={setReservation} />
        <button
          className="bg-indigo-500 hover:bg-indigo-600 px-4 py-3 mt-7 text-indigo-100 rounded-md mx-10 md:mx-0 flex items-center justify-center gap-2"
          onClick={saveReservation}
        >
          <span>
            <FaCalendarCheck />
          </span>
          Schedule
        </button>
        <div
          className={`bg-red-400/30 text-red-500 my-3 rounded-md p-2 border border-red-300  ${
            error2 ? "block" : "invisible"
          } `}
        >
          {error2.split(",").join(" & ")}
        </div>
      </div>
    </div>
  );
};

export default Reservation;
