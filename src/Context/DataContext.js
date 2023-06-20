import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [address, setAddress] = useState([]);

  return <DataContext.Provider value={{}}>{children}</DataContext.Provider>;
};
