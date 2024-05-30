import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const MiniHomeApi = ({ children }) => {
  const { userId } = useParams();

  useEffect(() => {
    console.log(userId);
    axios
      .get(`http://localhost:7090/api/user/minihome?userId=${userId}`, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
        }
      })
      .catch((error) => {});
  }, []);

  return <>{children}</>;
};

export default MiniHomeApi;
