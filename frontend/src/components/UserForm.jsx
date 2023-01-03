import React, { useState } from "react";
import { useUpdateProfileMutation } from "../features/user/profileApiSlice";

const UserForm = ({ profile, setShowProfile }) => {
  const [formData, setFormData] = useState(profile);
  const [error, setError] = useState(null);

  const [updateProfile, { isSuccess }] = useUpdateProfileMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await updateProfile(formData).unwrap();
      setError(null);
      setTimeout(() => {
        setShowProfile(false);
      }, 4000);
    } catch (error) {
      setError(error?.data?.message);
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white p-4 h-[70%] flex-1 rounded-md w-full lg:w-1/2 ease-linear duration-150">
      <form
        className="flex flex-col flex-wrap gap-2"
        onSubmit={(e) => handleSubmit(e)}
      >
        {error !== null || undefined ? (
          <p className="bg-red-200 text-red-500 px-3 py-2 flex justify-between text-sm rounded-md">
            {error.split(",").join(". ")}
            <span
              onClick={() => setError(null)}
              className="font-bold bg-red-300 text-red-500 text-xs h-[14px] w-[14px] p-[10px] flex justify-center items-center cursor-pointer rounded-full border border-red-500 hover:bg-red-400"
            >
              X
            </span>
          </p>
        ) : null}
        {isSuccess ? (
          <p className="bg-green-200 text-green-500 px-3 py-2 flex justify-between text-sm rounded-md">
            successfully change
          </p>
        ) : null}
        <div className="w-full mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-500 text-xs font-semibold mb-2"
            htmlFor="firstname"
          >
            First Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            name="firstname"
            value={formData.firstname}
            id="firstname"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="w-full mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-500 text-xs font-semibold mb-2"
            htmlFor="lastname"
          >
            Last Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            name="lastname"
            value={formData.lastname}
            id="lastname"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="w-full mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-500 text-xs font-semibold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="email"
            name="email"
            value={formData.email}
            id="email"
            disabled
          />
        </div>
        <div className="w-full mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-500 text-xs font-semibold mb-2"
            htmlFor="phonenumber"
          >
            Phone Number
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            name="phonenumber"
            value={formData.phonenumber}
            id="phonenumber"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="w-full mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-500 text-xs font-semibold mb-2"
            htmlFor="address"
          >
            Address
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            name="address"
            value={formData.address}
            id="address"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mt-2 flex justify-between">
          <button
            type="submit"
            className="bg-indigo-300 rounded-sm py-1 px-3 text-white hover:bg-indigo-500 ease-linear duration-100 w-[40%]"
          >
            SAVE
          </button>
          <button
            type="reset"
            onClick={() => setFormData(profile)}
            className="rounded-sm py-1 px-3 text-indigo-500 border hover:border hover:border-indigo-500 ease-linear duration-100 w-[40%]"
          >
            Reset
          </button>
          <button
            type="button"
            className="hover:bg-black hover:text-white rounded-sm py-1 px-3 ease-linear duration-100 "
            onClick={() => setShowProfile(false)}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
