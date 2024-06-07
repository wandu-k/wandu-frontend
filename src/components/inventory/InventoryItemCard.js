import React from "react";
import { Link } from "react-router-dom";
import { Confirm } from "notiflix/build/notiflix-confirm-aio";
import axios from "axios";

const InventoryItemCard = ({ item, userInfo }) => {
  const itemClasses = "w-full h-auto overflow-hidden";
  const imgClasses =
    "absolute object-cover h-full hover:scale-110 transition-all duration-300";
  const containerClasses =
    "relative rounded-2xl w-full aspect-square mb-1 overflow-hidden";
  // const [head, eye, mouse, cloth] = null;

  const handleInvenItemButton = () => {
    Confirm.show(
      "장착 확인",
      "아이템 " + item.itemName + "을 장착 하시겠습니까?",
      "장착",
      "취소",
      () => {
        avatarUpdate();
      },
      () => {}
    );
  };

  const avatarUpdate = () => {
    axios
      .put(
        "http://localhost:7090/api/user/avatar",
        {
          itemId: item.itemId,
          subcategoryId: item.subcategoryId,
        },
        {
          headers: { Authorization: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {})
      .catch((error) => {});
  };

  return (
    <button
      type="button"
      key={item.itemId}
      className={itemClasses}
      onClick={handleInvenItemButton}
    >
      <div className={containerClasses}>
        <img src={item.file} className={imgClasses} alt={item.itemName} />
      </div>
      <div>
        <p className="text-sm text-gray-500">{item.subcategoryName}</p>
        <h3>{item.itemName}</h3>
      </div>
    </button>
  );
};

export default InventoryItemCard;
