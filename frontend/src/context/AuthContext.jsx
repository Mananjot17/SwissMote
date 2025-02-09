import { createContext, useContext, useState } from "react";

// Create a new context for authentication
export const AuthContext = createContext();

// Custom hook for consuming the AuthContext easily
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// AuthContextProvider component to wrap the application and manage authentication state
export const AuthContextProvider = ({ children }) => {
  // State to store the authenticated user, initialized from localStorage if available
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("user-data")) || null
  );

  // Provide authUser and setAuthUser to any component within the context
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
