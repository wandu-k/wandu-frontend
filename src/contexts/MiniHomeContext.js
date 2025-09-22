import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoginContext } from "./LoginContext";

export const MiniHomeContext = createContext();

export const MiniHomeProvider = ({ children }) => {
  const { userId: paramUserId } = useParams(null);
  const [miniHome, setMiniHome] = useState(null);
  const { userInfo } = useContext(LoginContext);

  useEffect(() => {
    if (userInfo) {
      fetchMiniHomeData(paramUserId);
    }
  }, [paramUserId, userInfo]);

  const fetchMiniHomeData = (userId) => {
    var userId = paramUserId;
    if (!userId && userInfo) {
      userId = userInfo.userId;
    }
    if (userId) {
      axios
        .get(`https://wookportfolio.duckdns.org:8082/api/user/${userId}/minihome?likeUserId=${userInfo.userId}`, {
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
    }
  };

  return (
    <MiniHomeContext.Provider
      value={{ miniHome, fetchMiniHomeData, setMiniHome }}
    >
      {children}
    </MiniHomeContext.Provider>
  );
};
