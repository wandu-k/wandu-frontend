import MyRoomUi from "../components/miniHome/myRoom/MyRoomUi";
import { MiniHomeProvider } from "../contexts/MiniHomeContext";
import { LoginContext } from "../contexts/LoginContext";
import PostListUi from "../components/board/PostListUi";
import { useContext } from "react";

const MainPage = () => {
  const { userInfo } = useContext(LoginContext);
  return (
    <>
      <MiniHomeProvider>
        <div className="flex flex-col flex-1 gap-4">
          <MyRoomUi></MyRoomUi>
          <div className="flex gap-4 h-96">
            <PostListUi></PostListUi>
            <div className="w-full border border-slate-100 shadow-light z-auto backdrop-blur-md bg-white/75 rounded-2xl"></div>
          </div>
        </div>
      </MiniHomeProvider>
    </>
  );
};

export default MainPage;
