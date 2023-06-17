import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState("");

  const signupAPI = (data) => {};
  const loginAPI = (data) => {};

  useEffect(() => {
    if (localStorage.userToken) {
      setUserToken(localStorage.userToken);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userToken,
        setUserToken,
        isloggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
