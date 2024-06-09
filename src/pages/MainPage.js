import { useEffect, useState } from "react";
import MyRoomUi from "../components/miniHome/myRoom/MyRoomUi";
import { useParams } from "react-router-dom";
import axios from "axios";

const MainPage = () => {
  const { userId } = useParams();

  const [miniHome, setMiniHome] = useState(null);

  useEffect(() => {
    console.log(userId);
    axios
      .get(`http://localhost:7090/api/user/minihome?userId=${userId}`, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setMiniHome(response.data);
        }
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      {" "}
      <div className="w-full h-dvh pt-24 pb-20 px-4 rounded-2xl overflow-hidden">
        <MyRoomUi userId={userId} miniHome={miniHome} />
      </div>
    </>
  );
};

export default MainPage;
