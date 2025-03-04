// src/pages/AuthPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin"; // Custom hook for handling login
import useRegister from "../hooks/useRegister"; // Custom hook for handling registration

const AuthPage = ({ type }) => {
  const isLogin = type === "login"; // Check if the current page is for login or register
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const { login, loading: loginLoading } = useLogin(); // Hook to handle login logic
  const { register, loading: registerLoading } = useRegister(); // Hook to handle registration logic

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await login(formData.email, formData.password); // Call login hook if login form
    } else {
      await register(formData.fullname, formData.email, formData.password); // Call register hook if registration form
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-blue-100">
      <div className="flex flex-col sm:flex-row w-4/5 max-w-5xl rounded-lg overflow-hidden">
        {/* Left Section - Info Panel */}
        <div className="sm:w-1/2 bg-gradient-to-br from-indigo-600 to-blue-500 text-white p-8 sm:flex flex-col hidden justify-center">
          <h1 className="text-4xl font-bold mb-4">
            {isLogin ? "Welcome Back!" : "Join Event Manager"}
          </h1>
          <p className="text-lg mb-6">
            {isLogin
              ? "Login to access and manage your events with ease."
              : "Register now to create and manage your events seamlessly."}
          </p>
          <ul className="space-y-2">
            <li>📅 Create and manage events</li>
            <li>👥 Track attendees in real-time</li>
            <li>🚀 Fully responsive and easy to use</li>
          </ul>
        </div>

        {/* Right Section - Form Panel */}
        <div className="sm:w-1/2 bg-white p-12">
          <h2 className="text-3xl font-semibold mb-6">
            {isLogin ? "Login to Event Manager" : "Register for Event Manager"}
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                  value={formData.fullname}
                  onChange={(e) =>
                    setFormData({ ...formData, fullname: e.target.value })
                  }
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition ${
                (isLogin ? loginLoading : registerLoading) ? "opacity-50" : ""
              }`}
              disabled={isLogin ? loginLoading : registerLoading}
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600">
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <Link to="/register" className="text-indigo-500 font-medium">
                  Register here
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link to="/login" className="text-indigo-500 font-medium">
                  Login here
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
