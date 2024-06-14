import React, {useCallback, useEffect, useState} from "react";
import {Confirm} from "notiflix/build/notiflix-confirm-aio";
import axios from "axios";
import PlaylistAddMusicModal from "../modal/PlaylistAddMusicModal";
import defaultAlbum from "../../images/shop/album.png";
import previewAvatar from "../../images/avatar/body.png";
import {Notify} from "notiflix";


const InventoryItemCard = ({ item, userInfo }) => {
  const [enable, setEnable] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = useCallback(() => setModalIsOpen(true), []);
  const closeModal = useCallback(() => setModalIsOpen(false), []);

  const imgClasses =
    "absolute object-cover h-full hover:scale-110 transition-all duration-300";
  const containerClasses =
    "relative rounded-2xl w-full aspect-square mb-1 overflow-hidden";

  // const [head, eye, mouse, cloth] = null;

  useEffect(() => {
    setEnable(item.enable);
  }, []);

  const handleInvenItemButton = () => {
    const itemId = item.enable === 1 ? null : item.itemId;

    if (item?.categoryId == 1) {
      item.enable === 0
        ? Confirm.show(
            "장착 확인",
            "아이템 " + item.itemName + "을 장착 하시겠습니까?",
            "장착",
            "취소",
            () => {
              avatarUpdate(itemId);
            },
            () => {}
          )
        : Confirm.show(
            "장착 취소",
            "아이템 " + item.itemName + "을 해제 하시겠습니까?",
            "해제",
            "취소",
            () => {
              avatarUpdate(itemId);
            },
            () => {}
          );
    } else {
      openModal();
    }
  };

  const avatarUpdate = (itemId) => {
    axios
      .put(
        `/api/my/avatar/${item.buyItemId}`,
        {
          itemId: itemId,
          subcategoryId: item.subcategoryId,
        },
        {
          headers: { Authorization: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        if (item.enable == 1) {
          item.enable = 0;
          setEnable(0);
        } else {
          item.enable = 1;
          setEnable(1);
        }
        Notify.success(response.data);
      })
      .catch((error) => {});
  };

  return (
    <>
      <button
        type="button"
        key={item.itemId}
        className={
          "w-full h-auto overflow-hidden rounded-2xl" +
          (enable == 1 ? " border-lime-500 border-2" : " border")
        }
        onClick={handleInvenItemButton}
      >
        <div className={containerClasses}>
          <img
            src={
              item.categoryId == 1
                ? item.file
                : item.thumbnail
                ? item.thumbnail
                : defaultAlbum
            }
            className="absolute object-cover h-full "
            alt={item.itemName}
          />
          <img
            src={previewAvatar}
            className="absolute object-cover h-full -z-40 brightness-150 grayscale"
            alt={item.itemName}
          />
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-500">{item.subcategoryName}</p>
          <h3>{item.itemName}</h3>
        </div>
      </button>
      <PlaylistAddMusicModal
        isOpen={modalIsOpen}
        item={item}
        onRequestClose={closeModal}
      ></PlaylistAddMusicModal>
    </>
  );
};

export default InventoryItemCard;
