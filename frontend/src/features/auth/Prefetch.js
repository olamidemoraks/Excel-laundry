import { useEffect } from "react";
import { store } from "../../app/store";
import { Outlet } from "react-router-dom";
import { reservationApiSlice } from "../reservation/reservationApiSclice";
import useAuth from "../../hooks/useAuth";

const Prefetch = () => {
  const { isAdmin } = useAuth();
  useEffect(() => {
    store.dispatch(
      reservationApiSlice.util.prefetch(
        "getUserReservation",
        "userReservation",
        { force: true }
      )
    );
  }, []);
  return <Outlet />;
};

export default Prefetch;
