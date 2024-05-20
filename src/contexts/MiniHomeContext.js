import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Context 생성

export const MiniHomeContext = createContext();

// Context Provider
export const MiniHomeProvider = ({ children }) => {
  const [miniHomeInfo, setminiHomeInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { hpId } = useParams();

  // REST API로부터 미니홈 정보 가져오기
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get("http://localhost:7090/api/user/minihome", {
        headers: {
          Authorization: `${accessToken}`,
        },
        params: {
          hpId: hpId,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setminiHomeInfo(response.data);
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [hpId]);

  return (
    <MiniHomeContext.Provider value={miniHomeInfo}>
      {children}
    </MiniHomeContext.Provider>
  );
};
