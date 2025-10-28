import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Roles } from "../features/auth/roles";


export default function ProtectedRoute({ children, role }) {
  const { user, isAuth } = useSelector((state) => state.auth);

  // ✅ Not authenticated - redirect to sign in
  if (!isAuth || !user) {
    return <Navigate to="/auth/sign-in" replace />;
  }


  if (role && user.role !== role) {
    const redirectPath =
      user.role === Roles.ADMIN ? "/admin-dashboard" : "/customer-dashboard";

    return <Navigate to={redirectPath} replace />;
  }

  
  return children;
}