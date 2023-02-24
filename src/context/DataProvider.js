import React, { createContext, useContext, useState } from "react";
const DataContext = createContext();

export const DataProvider = ({ children }) => {
  //Product data
  const [productData, setProductData] = useState([]);

  const data = {
    productData,
  };
  const setData = {
    setProductData,
  };
  return (
    <DataContext.Provider value={{ ...data, ...setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
