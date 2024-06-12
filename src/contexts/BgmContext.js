import { createContext, useContext, useState } from "react";
import { MiniHomeContext } from "./MiniHomeContext";
import axios from "axios";

export const BgmContext = createContext();

export const BgmProvider = ({ children }) => {
  const [bgmList, setBgmList] = useState([]);
  const { miniHome } = useContext(MiniHomeContext);
  const loadBgmList = () => {
    axios
      .get(
        `http://localhost:7090/api/user/playlist/${miniHome?.playlistId}/bgm`,
        {
          headers: { Authorization: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        console.log(response.data);
        setBgmList(response.data);
      })
      .catch((error) => {});
  };

  return (
    <BgmContext.Provider value={{ loadBgmList, bgmList }}>
      {children}
    </BgmContext.Provider>
  );
};
