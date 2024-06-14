import axios from "axios";
import { useEffect, useState } from "react";

const BoardList = ({ children }) => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    axios
      .get("/api/minihome/board")
      .then((respone) => {
        setBoards(respone.data);
      })
      .catch((error) => {});
  }, []);

  return <>{children(boards)}</>;
};

export default BoardList;
