import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const allReservationAdapter = createEntityAdapter({});

const initialState = allReservationAdapter.getInitialState();

export const allReservationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllReservation: builder.query({
      query: () => ({
        url: "/reservation/getall",
      }),
      transformResponse: ({ reservations }) => {
        const loadedReserve = reservations.map((item) => {
          item.id = item._id;
          return item;
        });
        return allReservationAdapter.setAll(initialState, loadedReserve);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "AllReservation", id: "LIST" },
            ...result.ids.map((id) => ({ type: "AllReservation", id })),
          ];
        } else {
          return [{ type: "AllReservation", id: "LIST" }];
        }
      },
    }),
    updateStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/reservation/${id}`,
        method: "PATCH",
        body: {
          status,
        },
      }),
      invalidatesTags: (response, error, arg) => [
        { type: "AllReservation", id: arg.id },
      ],
    }),
  }),
});

export const { useGetAllReservationQuery, useUpdateStatusMutation } =
  allReservationApiSlice;
