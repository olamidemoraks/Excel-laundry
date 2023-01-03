import { apiSlice } from "../../app/api/apiSlice";
import { logout } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (siginCredential) => ({
        url: "/auth/signin",
        method: "POST",
        body: {
          ...siginCredential,
        },
      }),
    }),
    register: builder.mutation({
      query: (signupCredential) => ({
        url: "/auth/signup",
        method: "POST",
        body: {
          ...signupCredential,
        },
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        body: {},
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useSendLogoutMutation } =
  authApiSlice;
