import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa"; // User icon from react-icons
import { CgLogOut } from "react-icons/cg"; // Logout icon from react-icons
import useLogout from "../hooks/useLogout"; // Custom hook to handle user logout
import { useNavigate } from "react-router-dom"; // Navigation hook from react-router-dom
import { useAuthContext } from "../context/AuthContext"; // Custom context to get authenticated user information

const DashboardHeader = () => {
  // State to track if the dropdown menu is open or closed
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Custom logout hook
  const { logout } = useLogout();

  // For programmatic navigation
  const navigate = useNavigate();

  // Get the authenticated user from context
  const { authUser } = useAuthContext();

  // Toggle the dropdown menu visibility
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  // Handle logout logic
  const handleLogout = async () => {
    await logout(); // Perform logout operation (e.g., clear tokens)
    navigate("/login"); // Redirect user to the login page
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-indigo-600 to-blue-500 shadow-lg p-4 flex justify-between items-center text-white z-50">
      {/* Greeting message with user's full name (fallback to 'User' if not available) */}
      <h1 className="text-3xl font-bold">
        Welcome, {authUser.fullname || "User"}
      </h1>

      {/* User icon with dropdown menu for account options */}
      <div className="relative">
        {/* User profile icon (click to toggle dropdown) */}
        <FaRegUserCircle
          className="h-8 w-8 cursor-pointer"
          onClick={toggleDropdown}
        />

        {/* Dropdown menu (visible when dropdownOpen is true) */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-gray-700 shadow-lg rounded-md overflow-hidden z-10">
            {/* Logout button */}
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
