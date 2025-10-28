import React from "react";
import { useDispatch } from "react-redux";
import { clearAuth } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi"; // import icon

export default function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearAuth());
    localStorage.removeItem("token");
    navigate("/auth/sign-in");
  };

  return (
    <button
      onClick={handleLogout}
      className={`w-full px-4 py-2 flex items-center gap-2 rounded-md transition-colors duration-200 
        text-gray-300 hover:bg-gray-700 hover:text-white text-left`}
    >
      <FiLogOut className="text-lg" /> 
      Log Out
    </button>
  );
}
