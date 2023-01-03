import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const reservationAdapter = createEntityAdapter({});

const initialState = reservationAdapter.getInitialState();

export const reservationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserReservation: builder.query({
      query: () => ({
        url: "/reservation",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: ({ reservations }) => {
        const loadedReserve = reservations.map((item) => {
          item.id = item._id;
          return item;
        });
        return reservationAdapter.setAll(initialState, loadedReserve);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "UserReservation", id: "LIST" },
            ...result.ids.map((id) => ({ type: "UserReservation", id })),
          ];
        } else {
          return [{ type: "UserReservation", id: "LIST" }];
        }
      },
    }),

    addReservation: builder.mutation({
      query: (initialData) => ({
        url: "/reservation",
        method: "POST",
        body: {
          ...initialData,
        },
      }),
      invalidatesTags: (result, error, args) => [
        { type: "UserReservation", id: "LIST" },
      ],
    }),
    removeReservation: builder.mutation({
      query: ({ id }) => ({
        url: `/reservation/${id}`,
        method: "DELETE",
        body: {},
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "UserReservation", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetUserReservationQuery,
  useAddReservationMutation,
  useRemoveReservationMutation,
} = reservationApiSlice;
