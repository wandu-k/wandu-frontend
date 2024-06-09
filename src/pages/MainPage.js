import { useContext, useEffect, useState } from "react";
import MyRoomUi from "../components/miniHome/myRoom/MyRoomUi";
import { useParams } from "react-router-dom";
import { MiniHomeContext } from "../contexts/MiniHomeContext";

const MainPage = () => {
  const { userId } = useParams();
  const { miniHome } = useContext(MiniHomeContext);

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
