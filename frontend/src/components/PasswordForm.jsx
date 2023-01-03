import React, { useState } from "react";
import { useChangePasswordMutation } from "../features/user/profileApiSlice";

const initialData = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};
const PasswordForm = ({ setShowPassword }) => {
  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState(null);
  const [changePassword, { isSuccess }] = useChangePasswordMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await changePassword(formData).unwrap();
      setError(null);
      setTimeout(() => {
        setShowPassword(false);
      }, 4000);
    } catch (error) {
      setError(error?.data?.message);
    }
  };
  return (
    <div className="bg-white rounded-md p-4 h-[40%]">
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-3">
        <p className="my-3 text-center font-bold uppercase">Change password</p>
        {error !== null || undefined ? (
          <p className="bg-red-200 text-red-500 px-3 py-2 flex justify-between text-sm rounded-md">
            {error}
            <span
              onClick={() => setError(null)}
              className="font-bold  text-red-500 cursor-pointer"
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
            htmlFor="oldPassword"
          >
            Previous password
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            name="oldPassword"
            value={formData.oldPassword}
            id="oldPassword"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="w-full mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-500 text-xs font-semibold mb-2"
            htmlFor="newPassword"
          >
            New Password
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            id="newPassword"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="w-full mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-500 text-xs font-semibold mb-2"
            htmlFor="confirmNewPassword"
          >
            Confirm new password
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="password"
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            id="confirmNewPassword"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="flex justify-between">
          <button
            disabled={formData.confirmNewPassword !== formData.newPassword}
            className="bg-indigo-300 rounded-sm py-1 px-3 text-white hover:bg-indigo-500 ease-linear duration-100 hover:disabled:bg-red-400 disabled:bg-red-400"
            type="submit"
          >
            Submit
          </button>
          <button
            type="button"
            className="hover:bg-black hover:text-white rounded-sm py-1 px-3 ease-linear duration-100 "
            onClick={() => setShowPassword(false)}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordForm;
