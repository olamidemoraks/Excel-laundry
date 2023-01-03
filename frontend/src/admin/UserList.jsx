import React, { useEffect, useState } from "react";
import DashDisplay from "../components/DashDisplay";
import { DataGrid } from "@mui/x-data-grid";
import { useAllUserQuery } from "../features/user/profileApiSlice";
import Loading from "../components/Loading";
import { userColumns, userRows } from "../utils/userDataSource";

const UserList = () => {
  const [userRow, setuserRow] = useState([]);

  const {
    data: user,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useAllUserQuery("User", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  let content;
  useEffect(() => {
    if (isSuccess) {
      let userRowInit = [];
      const { ids, entities } = user;
      ids.map((id) => {
        userRowInit.push(userRows(entities[id]));
      });
      setuserRow(userRowInit);
    }
  }, [user]);

  if (isSuccess) {
    content = (
      <DataGrid
        className="text-gray-100"
        style={{
          color: "#eeeeee",
        }}
        loading={isLoading || !userRow}
        autoHeight
        rows={userRow || []}
        columns={userColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    );
  }

  if (isError) {
    content = <div>{error?.data?.message}</div>;
  }
  if (!userRow || isLoading) {
    content = <Loading bgColor={"bg-gray-700"} />;
  }

  return (
    <DashDisplay name={"Users"} total={userRow.length}>
      {content}
    </DashDisplay>
  );
};

export default UserList;
