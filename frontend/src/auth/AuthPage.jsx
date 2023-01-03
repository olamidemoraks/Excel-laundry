import React, { useState } from "react";
import image from "../assets/washmachine.jpg";
import image2 from "../assets/design.jpg";
import { setCredential } from "../features/auth/authSlice";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { useRegisterMutation } from "../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { motion } from "framer-motion";
import Loading from "../components/Loading";

const initialValue = {
  firstname: "",
  lastname: "",
  address: "",
  phonenumber: "",
  email: "",
  password: "",
};
const AuthPage = () => {
  const [isSignin, setIsSignin] = useState(false);
  const [formData, setFormData] = useState(initialValue);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const [register, { isLoading: isLoading2 }] = useRegisterMutation();

  const handleSwitchMode = () => {
    setIsSignin((prev) => !prev);
    setError(null);
  };

  const handleOnchange = useCallback(
    (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    },
    [formData]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token;
    try {
      if (isSignin) {
        const data = await register(formData).unwrap();

        token = data;
      } else {
        const data = await login(formData).unwrap();

        token = data;
      }
      dispatch(setCredential({ token }));
      navigate("/home");
    } catch (error) {
      setError(error?.data?.message);
    }
  };

  if (isLoading || isLoading2) {
    return <Loading />;
  }

  return (
    <div className="md:flex md:flex-row h-screen p-3">
      <div className="flex-1 my-auto">
        <form
          className="flex flex-col flex-wrap  gap-3 -mx-3 mb-6 p-20"
          onSubmit={(e) => handleSubmit(e)}
        >
          <p className="text-2xl text-black font-bold text-center pb-3 tracking-widest uppercase">
            {isSignin ? " create an account" : "Log into account"}
          </p>
          {error !== null || undefined ? (
            <p className="bg-red-200 text-red-500 px-3 py-2 flex justify-between gap-3 text-sm rounded-md">
              {error.split(",").join(", ")}
              <span
                onClick={() => setError(null)}
                className="font-bold bg-red-300 text-red-500 text-xs h-[14px] w-[14px] p-[10px] flex justify-center items-center cursor-pointer rounded-full border border-red-500 hover:bg-red-400"
              >
                X
              </span>
            </p>
          ) : null}
          {isSignin ? (
            <>
              <div className="flex flex-row">
                <div className="w-full md:w-1/2 pr-2 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="firstname"
                  >
                    First Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="firstname"
                    name="firstname"
                    type="text"
                    placeholder="John"
                    onChange={(e) => handleOnchange(e)}
                  />
                </div>
                <div className="w-full md:w-1/2 ">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="lastname"
                  >
                    Last Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="lastname"
                    name="lastname"
                    type="text"
                    placeholder="Doe"
                    onChange={(e) => handleOnchange(e)}
                  />
                </div>
              </div>
              <div className="w-full mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="address"
                >
                  Pickup Address
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Only available in makurdi"
                  onChange={(e) => handleOnchange(e)}
                />
              </div>
            </>
          ) : null}
          <div className="flex lg:flex-row flex-col">
            {isSignin && (
              <div className="w-full lg:w-1/2 pr-2 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="phone"
                  name="phonenumber"
                  type="text"
                  placeholder="9999-9999-9999"
                  onChange={(e) => handleOnchange(e)}
                />
              </div>
            )}
            <div
              className={`w-full ${
                isSignin ? "lg:w-1/2" : ""
              }  pr-2 mb-6 md:mb-0`}
            >
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="email"
                name="email"
                type="email"
                placeholder="e.g. johndoe@mail.com"
                onChange={(e) => handleOnchange(e)}
              />
            </div>
          </div>

          <div className="w-full mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="password"
              name="password"
              type="password"
              placeholder="*********"
              onChange={(e) => handleOnchange(e)}
            />
          </div>
          <button
            className="bg-black w-full text-gray-300 rounded-lg py-2 my-2 mx-auto text-base font-semibold "
            type="submit"
          >
            {isSignin ? "Create" : "Login"} account
          </button>
          <p
            className="text-center text-gray-700 cursor-pointer"
            onClick={handleSwitchMode}
          >
            {isSignin
              ? " I already have an account? login."
              : "Do not have an account? Sign up"}
          </p>
        </form>
      </div>
      <motion.div
        initial={{ x: "-60%", opacity: 0, scale: 0.5 }}
        animate={{ x: 1, opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          delay: 0.3,
          ease: [0.5, 0.71, 1, 1.5],
        }}
        className="hidden md:block md:flex-1 md:h-full md:w-full relative"
      >
        {isSignin ? (
          <>
            <img
              src={image}
              alt="washer"
              className="h-full object-fill rounded-2xl relative"
            />
            <button
              onClick={handleSwitchMode}
              className="absolute top-3 right-4 bg-black text-white px-3 py-1 rounded-xl tracking-wider hover:tracking-widest ease-linear duration-150"
            >
              Login
            </button>
          </>
        ) : (
          <>
            <img
              src={image2}
              alt="washer"
              className="h-full w-full object-cover rounded-2xl relative"
            />
            <button
              className="absolute top-3 right-4 bg-white text-black px-3 py-1 rounded-xl tracking-wider hover:tracking-widest ease-linear duration-150"
              onClick={handleSwitchMode}
            >
              Signin
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default AuthPage;
