import React, { useEffect, useState } from "react";
import DashDisplay from "../components/DashDisplay";
import Loading from "../components/Loading";
import {
  reservationColumn,
  reservationRow,
} from "../utils/reservationDataSource";
import {
  useGetAllReservationQuery,
  useUpdateStatusMutation,
} from "../features/reservation/allReservationApiSlice";
import { DataGrid } from "@mui/x-data-grid";
import { FiCheck, FiX, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";

const PickupList = () => {
  const [reserveRow, setReserveRow] = useState([]);
  const [updateStatus] = useUpdateStatusMutation();

  const updateReservation = async (id, status) => {
    await updateStatus({ id, status }).unwrap();
  };

  const actionColumn = [
    {
      field: "accept",
      header: "Accept",
      width: 60,
      renderCell: (params) => {
        return (
          <div>
            <button
              className="p-2 bg-green-300/60 border border-green-300 text-green-200 rounded-md"
              onClick={() => updateReservation(params.row.id, "accepted")}
            >
              <FiCheck />
            </button>
          </div>
        );
      },
    },
    {
      field: "reject",
      header: "Reject",
      width: 60,
      renderCell: (params) => {
        return (
          <div>
            <button
              className="p-2 bg-red-300/60 border border-red-300 text-red-200 rounded-md"
              onClick={() => updateReservation(params.row.id, "rejected")}
            >
              <FiX />
            </button>
          </div>
        );
      },
    },
    {
      field: "view",
      header: "View",
      width: 60,
      renderCell: (params) => {
        return (
          <Link
            className="p-2 bg-blue-300/60 border border-blue-300 text-blue-100 rounded-md"
            to={`${params.row.id}`}
          >
            <FiEye />
          </Link>
        );
      },
    },
  ];

  const {
    data: reservation,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetAllReservationQuery("AllReservation", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  let content;

  useEffect(() => {
    if (isSuccess) {
      let reserveRowInit = [];
      const { ids, entities } = reservation;

      ids.length &&
        ids.map((id) => {
          reserveRowInit.push(reservationRow(entities[id]));
        });
      setReserveRow(reserveRowInit);
    }
  }, [reservation]);

  if (!reserveRow || isLoading) {
    content = <Loading bgColor={"bg-gray-700"} />;
  }
  if (isError) {
    content = <div>{error?.data?.message}</div>;
  }

  if (isSuccess) {
    content = (
      <DataGrid
        className="text-gray-100"
        style={{
          color: "#eeeeee",
        }}
        loading={isLoading || !reserveRow}
        autoHeight
        rows={reserveRow || []}
        columns={reservationColumn.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    );
  }
  return (
    <DashDisplay name={"Pickup"} total={reserveRow.length}>
      {content}
    </DashDisplay>
  );
};

export default PickupList;
