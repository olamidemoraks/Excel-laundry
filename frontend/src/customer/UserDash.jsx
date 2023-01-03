import React from "react";
import Card from "../components/Card";
import { FcCalendar, FcNews } from "react-icons/fc";

const UserDash = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-[60vh]">
      <Card
        link="/home/reservation"
        header="Create Reservation"
        subHeader="Let's create a new reservation"
        icon={
          <FcCalendar className="absolute text-3xl -top-3 right-0 w-full" />
        }
      />
      <Card
        link="/home/history"
        header="Reservation History"
        subHeader="Check previous reservations"
        icon={<FcNews className="absolute text-3xl -top-3 right-0 w-full" />}
      />
    </div>
  );
};

export default UserDash;
