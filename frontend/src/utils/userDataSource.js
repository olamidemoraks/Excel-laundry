export const userColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 150,
  },
  {
    field: "firstname",
    headerName: "First name",
    width: 120,
  },
  {
    field: "lastname",
    headerName: "Last Name",
    width: 120,
  },
  {
    field: "email",
    headerName: "Email",
    width: 300,
  },

  {
    field: "phonenumber",
    headerName: "Phone Number",
    renderCell: (params) => {
      return params.value.replace(/^(\d{3})(\d{3})(\d{5})/, "$1-$2-$3");
    },
    width: 180,
  },
  {
    field: "address",
    headerName: "Address",
    width: 350,
  },
];

const userField = {
  id: "",
  firstname: "",
  lastname: "",
  email: "",
  phonenumber: "",
  address: "",
};

export const userRows = (user) =>
  Object.keys(userField).reduce((newObject, key) => {
    newObject[key] = user[key];
    return newObject;
  }, {});
