import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { LoginContext } from "./LoginContext";

export const MiniHomeContext = createContext();

export const MiniHomeProvider = ({ children }) => {
  const { userId } = useParams(null);
  const [miniHome, setMiniHome] = useState(null);


  useEffect(()=>{fetchMiniHomeData(userId)},[userId])

  const fetchMiniHomeData = (userId) => {
    axios
      .get(`http://localhost:7090/api/user/${userId}/minihome`, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          setMiniHome(response.data);
        }
      })
      .catch((error) => {
        // 에러 처리
        console.error("Error fetching minihome data:", error);
      });
  };



  return (
    <MiniHomeContext.Provider value={{ miniHome, fetchMiniHomeData }}>
      {children}
    </MiniHomeContext.Provider>
  );
};
