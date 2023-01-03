import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { store } from "../../app/store";
import useAuth from "../../hooks/useAuth";
import { allReservationApiSlice } from "../reservation/allReservationApiSlice";
import { reservationApiSlice } from "../reservation/reservationApiSclice";
import { profileApiSlice } from "../user/profileApiSlice";

const AdminPrefetch = () => {
  const { isAdmin } = useAuth();
  useEffect(() => {
    if (!isAdmin) {
      return;
    }
    store.dispatch(
      profileApiSlice.util.prefetch("allUser", "getUser", { force: true })
    );
    store.dispatch(
      allReservationApiSlice.util.prefetch(
        "getAllReservation",
        "allReservation",
        {
          force: true,
        }
      )
    );
  }, []);
  return <Outlet />;
};

export default AdminPrefetch;
