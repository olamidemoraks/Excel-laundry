import React from "react";
import HistoryItem from "../components/HistoryItem";
import Loading from "../components/Loading";
import { FiCodesandbox } from "react-icons/fi";
import { useGetUserReservationQuery } from "../features/reservation/reservationApiSclice";

const History = () => {
  const {
    data: reservation,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetUserReservationQuery("userReservation", {
    // pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;
  if (!reservation?.ids || isLoading) {
    content = <Loading />;
  }
  if (isError) {
    content = <div>{error?.data?.message}</div>;
  }

  if (isSuccess) {
    const { ids } = reservation;
    content = (
      <div>
        {ids?.length || reservation || !isLoading ? (
          <div className=" grid grid-cols-1 gap-9 mx-32 md:grid-cols-2 lg:grid-cols-4  ">
            {ids?.map((reserveId) => (
              <HistoryItem key={reserveId} reserveId={reserveId} />
            ))}
          </div>
        ) : (
          <div className=" flex flex-col items-center justify-center gap-4 mt-[200px] w-full text-2xl text-gray-500">
            No Pickups <FiCodesandbox className="text-indigo-500" />
          </div>
        )}
      </div>
    );
  }

  return content;
};

export default History;
