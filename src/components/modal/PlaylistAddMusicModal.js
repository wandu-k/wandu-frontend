import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { LoginContext } from "../../contexts/LoginContext";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { MiniHomeContext } from "../../contexts/MiniHomeContext";
import { BgmContext } from "../../contexts/BgmContext";

Modal.setAppElement("#root");

const PlaylistAddMusicModal = ({ isOpen, onRequestClose, item }) => {
  const { userInfo } = useContext(LoginContext);
  const { miniHome } = useContext(MiniHomeContext);
  const { loadBgmList } = useContext(BgmContext);
  const [playlistList, setPlaylistList] = useState([]);
  const [checkItems, setCheckItems] = useState(new Set());

  const loadPlaylist = () => {
    axios
      .get("/api/my/playlist", {
        params: { itemId: item.itemId },
        headers: { Authorization: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        console.log(response.data);
        setPlaylistList(response.data);
        includeCheck(response.data); // includeCheck 함수에 playlist 데이터를 전달합니다.
      })
      .catch((error) => {});
  };

  useEffect(() => {
    if (!isOpen) {
      loadBgmList();
    }
  }, [isOpen]);

  const toggleCheck = (playlistId) => {
    const newCheckItems = new Set(checkItems);
    if (newCheckItems.has(playlistId)) {
      newCheckItems.delete(playlistId);
    } else {
      newCheckItems.add(playlistId);
    }
    setCheckItems(newCheckItems);

    if (newCheckItems.has(playlistId)) {
      axios
        .post(
          `/api/my/playlist/${playlistId}/bgm/${item.buyItemId}`,
          {},
          {
            headers: { Authorization: localStorage.getItem("accessToken") },
          }
        )
        .then((response) => {
          loadPlaylist();
          Notify.success(response.data);
        })
        .catch((error) => {});
    } else {
      axios
        .delete(
          `/api/my/playlist/${playlistId}/bgm/${item.buyItemId}`,
          {
            headers: { Authorization: localStorage.getItem("accessToken") },
          }
        )
        .then((response) => {
          Notify.success(response.data);
        })
        .catch((error) => {});
    }
  };

  const includeCheck = (playlist) => {
    const newCheckItems = new Set(checkItems);
    for (let i = 0; i < playlist.length; i++) {
      if (playlist[i].include === 1) {
        console.log(playlist[i]);
        newCheckItems.add(playlist[i].playlistId);
      }
    }
    setCheckItems(newCheckItems);
  };

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={loadPlaylist}
      onRequestClose={onRequestClose}
      className={
        "dark:bg-slate-950 dark:border-slate-800 dark:text-white text-black p-4 bg-white"
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
            {playlistList.map((playlist) => (
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
                  checked={checkItems.has(playlist.playlistId)}
                  onChange={() => toggleCheck(playlist.playlistId)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className=" flex justify-end">
          <button onClick={onRequestClose}>확인</button>
        </div>
      </div>
    </Modal>
  );
};

export default PlaylistAddMusicModal;
