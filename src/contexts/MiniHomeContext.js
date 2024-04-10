import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Context 생성

export const MiniHomeContext = createContext();

// Context Provider
export const MiniHomeProvider = ({ children }) => {
  const [miniHomeInfo, setminiHomeInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { hpID } = useParams();

  // REST API로부터 미니홈 정보 가져오기
  useEffect(() => {
    axios
      .get("http://localhost:7090/api/minihome", {
        params: {
          hpID: hpID,
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
  }, [hpID]);

  return (
    <MiniHomeContext.Provider value={miniHomeInfo}>
      {children}
    </MiniHomeContext.Provider>
  );
};
