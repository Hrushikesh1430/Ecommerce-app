import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [login, setLogin] = useState(false);

  const signupAPI = (data) => {};
  const loginAPI = (data) => {};

  return (
    <AuthContext.Provider
      value={{
        login,
        setLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
