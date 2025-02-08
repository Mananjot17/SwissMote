// src/hooks/useRegister.js
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const register = async (fullname, email, password) => {
    setLoading(true);
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

      const data = response.data;
      console.log("Registration successful:", data);

      localStorage.setItem("user-data", JSON.stringify(data));
      setAuthUser(data);
      // Handle successful registration
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { register, loading };
};

export default useRegister;
