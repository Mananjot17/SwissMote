// src/hooks/useRegister.js
import { useState } from "react";
import axios from "axios";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        }
      );

      console.log("Registration successful:", response.data);
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
