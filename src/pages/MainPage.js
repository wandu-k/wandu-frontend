import MyRoomUi from "../components/miniHome/myRoom/MyRoomUi";

import { MiniHomeProvider } from "../contexts/MiniHomeContext";
import PostListUi from "../components/board/PostListUi";

const MainPage = () => {
  return (
    <>
      <MiniHomeProvider>
        <div className="flex w-full h-full gap-4">
          <div className="flex flex-col w-full gap-4">
            <MyRoomUi></MyRoomUi>
            <div className="flex gap-4 h-96">
              <PostListUi></PostListUi>
              <div className="w-full border border-slate-100 shadow-light z-auto backdrop-blur-md bg-white/75 rounded-2xl"></div>
            </div>
          </div>
          <div className="w-96 border border-slate-100 shadow-light z-auto backdrop-blur-md bg-white/75 rounded-2xl md:hidden xl:block"></div>
        </div>
      </MiniHomeProvider>
    </>
  );
};

export default MainPage;
