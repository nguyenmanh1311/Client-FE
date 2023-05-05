import React, { createContext, useContext, useState } from "react";
const DataContext = createContext();

export const DataProvider = ({ children }) => {
  //Product data
  const [phoneForgetPass, setPhoneForgetPass] = useState("");
  const [productData, setProductData] = useState([]);

  //Paginate
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  //Filter
  const [orderBy, setOrderBy] = useState("Price");
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [color, setColor] = useState([]);

  const data = {
    productData,
    phoneForgetPass,
    currentPageNumber,
    orderBy,
    minPrice,
    maxPrice,
    categories,
    brands,
    pageCount,
    color,
  };
  const setData = {
    setProductData,
    setPhoneForgetPass,
    setCurrentPageNumber,
    setPageCount,
    setOrderBy,
    setMinPrice,
    setMaxPrice,
    setCategories,
    setBrands,
    setColor,
  };

  return (
    <DataContext.Provider value={{ ...data, ...setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
