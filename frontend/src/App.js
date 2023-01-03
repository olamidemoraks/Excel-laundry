import { Routes, Route } from "react-router-dom";
import AuthPage from "./auth/AuthPage";
import Layout from "./components/Layout";
import Home from "./customer/Home";
import UserDash from "./customer/UserDash";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./features/auth/authSlice";
import { Navigate } from "react-router-dom";
import Reservation from "./customer/Reservation";
import History from "./customer/History";
import Prefetch from "./features/auth/Prefetch";
import AdminPrefetch from "./features/auth/adminPrefetch";
import Profile from "./customer/Profile";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./admin/Dashboard";
import PickupList from "./admin/PickupList";
import UserList from "./admin/UserList";
import SinglePickup from "./admin/SinglePickup";
import RequireAuth from "./features/auth/RequireAuth";

function App() {
  const token = useSelector(selectCurrentToken);
  console.log(token);

  return (
    <>
      <Routes>
        <Route
          path="/authenticate"
          element={!token ? <AuthPage /> : <Navigate to={"/home"} />}
        />
        <Route path="/" element={<Home />} />

        <Route element={<Prefetch />}>
          <Route path="/home" element={<Layout />}>
            <Route
              index
              element={token ? <UserDash /> : <Navigate to={"/authenticate"} />}
            />
            <Route
              path="reservation"
              element={
                token ? <Reservation /> : <Navigate to={"/authenticate"} />
              }
            />
            <Route
              path="history"
              element={token ? <History /> : <Navigate to={"/authenticate"} />}
            />
            <Route
              path="profile"
              element={token ? <Profile /> : <Navigate to={"/authenticate"} />}
            />
          </Route>
        </Route>
        <Route element={<RequireAuth allowedRole={"Admin"} />}>
          <Route element={<AdminPrefetch />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="pickup" element={<PickupList />} />
              <Route path="pickup/:id" element={<SinglePickup />} />
              <Route path="users" element={<UserList />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
