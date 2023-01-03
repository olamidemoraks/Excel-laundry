import useStatus from "../hooks/useStatus";
const statusColor = {
  waiting: "orange",
  accepted: "green",
  rejected: "red",
  delivered: "blue",
};

export const reservationColumn = [
  {
    field: "id",
    headerName: "ID",
    width: 150,
  },
  {
    field: "receipt",
    headerName: "Receipt",
    width: 100,
  },
  {
    field: "userId",
    headerName: "UserID",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phonenumber",
    headerName: "Phone Number",
    width: 150,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    renderCell: (params) => {
      return (
        <div
          className={`border border-${
            statusColor[params.row.status]
          }-300 px-2 py-1 rounded-md text-${
            statusColor[params.row.status]
          }-200 `}
        >
          {params.row.status}
        </div>
      );
    },
  },
];

const reserveField = {
  id: "",
  receipt: "",
  userId: "",
  email: "",
  phonenumber: "",
  status: "",
};

export const reservationRow = (reserve) =>
  Object.keys(reserveField).reduce((newObj, key) => {
    newObj[key] = reserve[key];
    return newObj;
  }, {});
