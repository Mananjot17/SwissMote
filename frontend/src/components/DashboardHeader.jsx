import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const DashboardHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { logout } = useLogout();
  const navigate = useNavigate();
  const { authUser } = useAuthContext();

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-indigo-600 to-blue-500 shadow-lg p-4 flex justify-between items-center text-white z-50">
      <h1 className="text-3xl font-bold">
        Welcome, {authUser.fullname || "User"}
      </h1>
      <div className="relative">
        <FaRegUserCircle
          className="h-8 w-8 cursor-pointer"
          onClick={toggleDropdown}
        />
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-gray-700 shadow-lg rounded-md overflow-hidden z-10">
            <button
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex gap-2 items-center"
              onClick={handleLogout}
            >
              <CgLogOut className="w-5 h-5" />
              <p>Logout</p>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
