import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { logout, loading, error } = useLogout();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center relative">
      <h1 className="text-2xl font-bold text-gray-900">Welcome User</h1>
      <div className="relative">
        <FaRegUserCircle
          className="h-5 w-5 text-gray-900 cursor-pointer"
          onClick={toggleDropdown}
        />
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-30 bg-white shadow-lg rounded-md overflow-hidden z-10">
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex gap-2 items-center"
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
