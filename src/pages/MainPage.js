import MyRoomUi from "../components/miniHome/myRoom/MyRoomUi";

import MiniHomeApi from "../components/miniHome/MiniHomeApi";
import { useParams } from "react-router-dom";

const MainPage = () => {
  const { userId } = useParams();
  return (
    <>
      <MiniHomeApi>
        {" "}
        <div className="w-full h-dvh pt-24 pb-20 px-4 rounded-2xl overflow-hidden">
          <MyRoomUi userId={userId}></MyRoomUi>
        </div>
      </MiniHomeApi>
    </>
  );
};

export default MainPage;
