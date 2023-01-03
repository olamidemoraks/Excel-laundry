import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const userAdaptor = createEntityAdapter({});
const initialState = userAdaptor.getInitialState();

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allUser: builder.query({
      query: () => ({
        url: "/user",
        validateStatus: (response, result) => {
          return (response.status === 200) & !result.isError;
        },
      }),
      transformResponse: (response) => {
        const responseData = response.map((user) => {
          user.id = user._id;
          return user;
        });
        return userAdaptor.setAll(initialState, response);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else {
          return [{ type: "User", id: "LIST" }];
        }
      },
    }),

    userProfile: builder.query({
      query: () => ({
        url: "/user/showMe",
        method: "GET",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
    }),
    updateProfile: builder.mutation({
      query: (initialData) => ({
        url: "/user/updateUserProfile",
        method: "PATCH",
        body: {
          ...initialData,
        },
      }),
    }),
    changePassword: builder.mutation({
      query: (initialData) => ({
        url: "/user/updateUserPassword",
        method: "PATCH",
        body: {
          ...initialData,
        },
      }),
    }),
  }),
});

export const {
  useUserProfileQuery,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useAllUserQuery,
} = profileApiSlice;
