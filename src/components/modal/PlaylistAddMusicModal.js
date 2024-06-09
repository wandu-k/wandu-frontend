import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { LoginContext } from "../../contexts/LoginContext";

Modal.setAppElement("#root"); // Set the root element for accessibility

const PlaylistAddMusicModal = ({ isOpen, onRequestClose, item }) => {
  const { userInfo } = useContext(LoginContext);
  const [playlistList, setPlaylistList] = useState([]);
  const [checkItems, setCheckItems] = useState(new Set());
  const handleLogin = () => {
    // Handle login logic here
    onRequestClose();
  };

  const loadPlaylist = () => {
    axios
      .get(
        "http://localhost:7090/api/user/my/playlist",

        {
          params: { itemId: item.itemId },
          headers: { Authorization: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        console.log(response.data);
        setPlaylistList(response.data);
      })
      .catch((error) => {});
  };

  const toggleCheck = (playlistId, itemId) => {
    const newCheckItems = new Set(checkItems); // checkItems의 복사본을 만듭니다.
    if (newCheckItems.has(playlistId)) {
      newCheckItems.delete(playlistId); // 이미 체크된 상태였다면 제거
    } else {
      newCheckItems.add(playlistId); // 체크되지 않은 상태였다면 추가
    }
    setCheckItems(newCheckItems); // 새로운 체크 항목으로 상태를 업데이트합니다.

    // 체크 상태에 따라 "A" 또는 "B"를 콘솔에 출력합니다.
    if (newCheckItems.has(playlistId)) {
      console.log("A");
      axios.post(
        "http://localhost:7090/api/user/bgm",
        {
          userId: userInfo.userId,
          playlistId: playlistId,
          itemId: item.itemId,
        },
        {
          headers: { Authorization: localStorage.getItem("accessToken") },
        }
      );
    } else {
      console.log("B");
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={loadPlaylist}
      onRequestClose={onRequestClose}
      className={
        "dark:bg-slate-950 dark:border-slate-800 dark:text-white text-black p-4"
      }
      style={{
        content: {
          position: "relative",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          display: "flex",
          height: "40%",
          width: "auto",
          zIndex: 1001,
          borderRadius: "20px",
          minWidth: "250px",
        },
        overlay: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
          backgroundColor: "rgba(0,0,0,0.75)",
        },
      }}
    >
      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-col">
          <h3 className=" font-bold text-lg">노래 저장</h3>
          <div className="overflow-y-scroll">
            {playlistList?.map((playlist) => (
              <div
                key={playlist.playlistId}
                className="flex w-full flex-row-reverse items-center h-11 gap-4 justify-end"
              >
                <label className="" htmlFor={playlist.playlistId}>
                  {playlist.plName}
                </label>
                <input
                  type="checkbox"
                  id={playlist.playlistId}
                  checked={
                    playlist.include == 1 || checkItems.has(playlist.playlistId)
                  }
                  onChange={() => toggleCheck(playlist.playlistId)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className=" flex justify-end">
          <button>확인</button>
        </div>
      </div>
      <></>
    </Modal>
  );
};

export default PlaylistAddMusicModal;
