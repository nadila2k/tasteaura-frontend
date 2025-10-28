import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Roles } from "../features/auth/roles";

export default function AuthRoute({ children }) {
  const { user, isAuth } = useSelector((state) => state.auth);

  if (isAuth && user) {
    const redirectPath =
      user.role === Roles.ADMIN ? "/admin-dashboard" : "/customer-dashboard";

    return <Navigate to={redirectPath} replace />;
  }

  return children;
}
