import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { AuthContext } from "..";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
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
      userId: "1",
      name: "Aadarsh Balika",
      phone: "8104460774",
      residence: "71/5 Abhudhaya Society",
      area: "Nehru Nagar Kurla East",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400024",
    },
  ]);

  const [checkoutTotal, setcheckOutTotal] = useState(0);

  const deliveryCharges = 100;

  return (
    <DataContext.Provider
      value={{
        address,
        setAddress,
        checkoutTotal,
        setcheckOutTotal,
        deliveryCharges,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
