import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const ShopCategoryContext = createContext();

export const ShopCategoryProvider = ({ children }) => {
  const location = useLocation();
  const [category, setCategory] = useState(null); // Correctly initialize useState
  useEffect(() => {
    if (location.pathname.includes("/shop")) {
      axios
        .get("http://localhost:7090/api/public/shop/category")
        .then((response) => {
          setCategory(response.data);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    }
  }, [location.pathname]);
  return (
    <ShopCategoryContext.Provider value={{ category }}>
      {children}
    </ShopCategoryContext.Provider>
  );
};
