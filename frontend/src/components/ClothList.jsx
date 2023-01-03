import React, { useState } from "react";
import { items } from "../utils/item";

const ClothList = ({ item, reservation, setReservation }) => {
  const [qty, setQty] = useState(item.qty);

  const updateQty = (num) => {
    if (qty + num !== -1) {
      setQty((prev) => prev + num);
    }
  };

  return (
    <div className="md:min-w-max bg-indigo-100/60 p-4 rounded-md flex md:gap-5 shadow-md  shadow-gray-200/60 justify-between md:h-24">
      <div className="p-2 bg-white/70 h-13 w-15 rounded-sm">
        <img
          className="w-full h-full object-cover"
          src={item.image}
          alt={item.name}
        />
      </div>
      <div className=" flex flex-col gap-2">
        <p className="text-gray-800 capitalize">{item.name}</p>
        <div className="flex items-center gap-2">
          <button
            className="h-4 w-4 text-center px-[2px] pb-[3px] flex items-center justify-center rounded-sm hover:shadow-sm border border-indigo-500/40 hover:shadow-gray-400/70 text-gray-600 text-lg  bg-white"
            onClick={() => {
              updateQty(-1);
              setReservation({
                ...reservation,
                [item.data]: qty - 1 === -1 ? 0 : qty - 1,
              });
            }}
          >
            -
          </button>
          <p className="text-gray-800">{qty}</p>
          <button
            className="h-4 w-4 text-center px-[2px] pb-[4px] flex items-center justify-center rounded-sm hover:shadow-sm hover:shadow-gray-400/70 text-gray-100 text-lg bg-indigo-600/50 hover:bg-indigo-600/75"
            onClick={() => {
              updateQty(+1);
              setReservation({ ...reservation, [item.data]: qty + 1 });
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClothList;
