import React, { useState } from "react";
import {
  BsFillPersonLinesFill,
  BsEnvelope,
  BsTelephone,
  BsAward,
} from "react-icons/bs";
import { GoLocation, GoLock } from "react-icons/go";
import Loading from "../components/Loading";
import PasswordForm from "../components/PasswordForm";
import UserForm from "../components/UserForm";
import { useGetUserReservationQuery } from "../features/reservation/reservationApiSclice";
import { useUserProfileQuery } from "../features/user/profileApiSlice";

const Profile = () => {
  const {
    data: profile,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useUserProfileQuery("userReservation", {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: true,
  });

  console.log(profile);
  const [showProfile, setShowProfile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { data: reservation, isLoading: isLoading2 } =
    useGetUserReservationQuery("userReservation", {
      // pollingInterval: 15000,
      refetchOnFocus: false,
      refetchOnMountOrArgChange: true,
    });

  const handleProfile = () => {
    setShowProfile((prev) => !prev);
    setShowPassword();
  };

  const handlePasswordShow = () => {
    setShowProfile(false);
    setShowPassword((prev) => !prev);
  };

  let content;
  if (isError) {
    content = <div>{error?.data?.message}</div>;
  }
  if (isLoading || isLoading2) {
    return <Loading />;
  }

  if (isSuccess) {
    const { ids } = reservation;
    content = (
      <div
        className={`${showProfile || showPassword ? "hidden" : ""} md:block `}
      >
        <div className="flex flex-col bg-white p-4 rounded-md w-96 h-72">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-3  ">
              <div className="text-md font-extrabold text-white bg-indigo-500 p-2 w-12 h-12 flex items-center justify-center rounded-full uppercase cursor-pointer">
                {profile.firstname.substring(0, 1)}
              </div>
              <div className="text-gray-600 text-lg font-bold capitalize">
                {profile.firstname + " " + profile.lastname || ""}
              </div>
            </div>
            <div>
              <BsFillPersonLinesFill
                className="text-gray-600"
                onClick={handleProfile}
              />
            </div>
          </div>
          <hr />
          <div className="flex flex-col  my-4 gap-3">
            <div className="flex gap-3 items-center">
              <GoLocation className="text-lg text-gray-700" />{" "}
              <p className="text-sm text-gray-500 tracking-wide">
                {profile.address || ""}
              </p>{" "}
            </div>
            <div className="flex gap-3 items-center">
              <BsEnvelope className="text-lg text-gray-700" />{" "}
              <p className="text-sm text-gray-500 tracking-wide">
                {profile.email || ""}
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <BsTelephone className="text-lg text-gray-700" />{" "}
              <p className="text-sm text-gray-500 tracking-wide">
                {profile.phonenumber || ""}
              </p>
            </div>
          </div>
          <hr />
          <div className="flex justify-between my-4">
            <div className="flex gap-3 items-center">
              <BsAward className="text-lg text-gray-700" />{" "}
              <p className="text-sm text-gray-500 tracking-wide">
                Total reservation
              </p>
            </div>
            <div className="text-sm text-gray-700 tracking-wide">
              {ids?.length !== null || undefined ? ids.length : 0} reserve
            </div>
          </div>
          <div
            onClick={handlePasswordShow}
            className="flex gap-2 my-2 cursor-pointer group"
          >
            <GoLock className="text-lg text-gray-700 group-hover:text-indigo-500" />{" "}
            <span className="text-sm text-gray-500 tracking-wide  group-hover:text-indigo-500">
              Change Password
            </span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gray-100  flex justify-center pt-20 min-h-screen flex-row gap-5 px-10  md:px-24  ease-linear duration-150">
      {content}
      {showProfile ? (
        <UserForm setShowProfile={setShowProfile} profile={profile} />
      ) : null}
      {showPassword ? <PasswordForm setShowPassword={setShowPassword} /> : null}
    </div>
  );
};

export default Profile;
