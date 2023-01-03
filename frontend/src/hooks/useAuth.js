import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  //   const [token, setToken] = useState("");
  const token = useSelector(selectCurrentToken);
  let isAdmin;
  let status = "User";

  //   useEffect(() => {
  //     setToken(localStorage.getItem("_profile"));
  //   }, [JSON.parse(localStorage.getItem("_profile"))]);

  if (token) {
    const { user, role } = jwtDecode(token);
    isAdmin = role.includes("admin");

    if (isAdmin) status = "Admin";

    return {
      token,
      username: user,
      isAdmin,
      status,
    };
  }
  return {
    token,
    username: "",
    isAdmin,
    status,
  };
};

export default useAuth;
