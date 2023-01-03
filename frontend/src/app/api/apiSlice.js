import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3500/api/v1",
    credentials: "include",
  }),

  tagTypes: ["UserReservation", "AllReservation", "User"],
  endpoints: (builder) => ({}),
});
