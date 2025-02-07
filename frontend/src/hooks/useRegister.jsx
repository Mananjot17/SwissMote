// src/hooks/useRegister.js
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext.jsx";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setAuthUser } = useAuthContext();

  const register = async (fullname, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          fullname,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Registration successful:", response.data);

      localStorage.setItem("user-data", JSON.stringify(response.data));
      setAuthUser(response.data);
      // Handle successful registration
    } catch (err) {
      console.error(
        "Registration failed:",
        err.response?.data?.message || err.message
      );
      setError(err.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};

export default useRegister;
