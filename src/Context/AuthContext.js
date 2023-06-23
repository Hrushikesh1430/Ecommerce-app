import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState("");
  const [user, setUser] = useState({});

  const checkLogin = () => {
    if (localStorage.getItem("userToken")) {
      let loggedUser = localStorage.getItem("loggedUser");
      setUserToken(localStorage.userToken);
      setUser(JSON.parse(loggedUser));
      setIsLoggedIn(true);
    }
  };

  const signupAPI = (data) => {};
  const loginAPI = (data) => {};

  return (
    <AuthContext.Provider
      value={{
        userToken,
        setUserToken,
        isloggedIn,
        setIsLoggedIn,
        checkLogin,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
