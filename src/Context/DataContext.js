import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { v4 as uuid } from "uuid";
import { AuthContext } from "..";
import { FilterReducer, InitialState } from "../Reducers/FilterReducer";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [address, setAddress] = useState([
    {
      id: uuid(),
      userId: "2",
      name: "Hrushikesh Tawde",
      phone: "9867611782",
      residence: "71/5 Abhudhaya Society",
      area: "Nehru Nagar Kurla East",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400024",
    },
    {
      id: uuid(),
      userId: "2",
      name: "Madhavi Tawde",
      phone: "9969535222",
      residence: "47/1430 Vishwadham Co-op Housing Society",
      area: "Nehru Nagar Kurla East",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400024",
    },
    {
      id: uuid(),
      userId: "2",
      name: "Deepak Tawde",
      phone: "9865871681",
      residence: "47/1430 Vishwadham Co-op Housing Society",
      area: "Nehru Nagar Kurla East",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400024",
    },
    {
      id: uuid(),
      userId: "2",
      name: "Akshaya Tawde",
      phone: "9969535222",
      residence: "47/1430 Vishwadham Co-op Housing Society",
      area: "Nehru Nagar Kurla East",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400024",
    },
    {
      id: uuid(),
      userId: "1",
      name: "Aadarsh Balika",
      phone: "8104460774",
      residence: "71/5 Abhudhaya Society",
      area: "Nehru Nagar Kurla East",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400024",
    },
    {
      id: uuid(),
      userId: "4",
      name: "Parth Patel",
      phone: "9167665349",
      residence: "403/67, Rahul CHS",
      area: "Lallubhai Compound, Mankhurd(West)",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400043",
    },
  ]);
  const [state, dispatch] = useReducer(FilterReducer, InitialState);
  const [checkoutTotal, setcheckOutTotal] = useState(0);
  const [loader, setLoader] = useState(true);

  const deliveryCharges = 300;

  const discount = 500;

  const [AppDevice, setAppDevice] = useState(0);

  return (
    <DataContext.Provider
      value={{
        address,
        setAddress,
        checkoutTotal,
        setcheckOutTotal,
        deliveryCharges,
        discount,
        state,
        dispatch,
        AppDevice,
        setAppDevice,
        loader,
        setLoader,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
