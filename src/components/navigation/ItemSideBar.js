import React, { useContext, useEffect, useState } from "react";
import { Confirm } from "notiflix/build/notiflix-confirm-aio";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../../contexts/LoginContext";

const ItemSideBar = ({ item }) => {
  const navigate = useNavigate();
  const { userInfo, isLogin } = useContext(LoginContext);

  const purchase = async () => {
    try {
      const response = await axios.post(
        "http://localhost:7090/api/user/item",
        {
          userId: userInfo?.userId,
          itemId: item?.itemId,
          buyDate: new Date(),
        },
        {
          headers: { Authorization: localStorage.getItem("accessToken") },
        }
      );
      if (response.status === 200) {
        navigate(`/shop`);
      }
    } catch (error) {}
  };

  const handleBuyButton = () => {
    Confirm.show(
      "구매 확인",
      "이 아이템을 구매 하시겠습니까?",
      "구매",
      "취소",
      () => {
        purchase();
      },
      () => {}
    );
  };

  return (
    <div className="flex flex-col gap-4 sticky top-20 p-4 border rounded-2xl">
      <div className="flex gap-4 h-36">
        <div className=" relative h-full aspect-square rounded-2xl overflow-hidden">
          <img
            src={item?.file}
            className=" absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="font-bold text-gray-400">{item?.subcategoryName}</div>
          <div className="text-xl font-bold">{item?.itemName}</div>
        </div>
      </div>
      {item?.purchaseStatus ? (
        <button
          type="button"
          disabled
          onClick={handleBuyButton}
          className=" bg-gray-300 h-14 rounded-2xl text-gray-500 font-bold text-xl content-center text-center"
        >
          구매완료
        </button>
      ) : (
        <button
          type="button"
          onClick={handleBuyButton}
          className=" bg-lime-500 h-14 rounded-2xl text-white font-bold text-xl content-center text-center"
        >
          아이템 구매
        </button>
      )}
      <Link
        to={`/shop/item?userId=${item?.userId}&nickname=${item?.nickname}&categoryName=${item?.categoryName}`}
        className=" border-lime-500 border h-14 rounded-2xl font-bold text-xl content-center text-center"
      >
        제작자의 다른 리소스 보기
      </Link>
      <div className="border w-full"></div>
      <div className="flex justify-between w-full">
        <div className="flex gap-2">
          <div className="font-bold">제작자</div>
          <Link to={`/${item?.userId}/minihome`}>{item?.nickname}</Link>
        </div>
        <div className="flex gap-2">
          <div className="font-bold">구매</div>
          <Link to={`/${item?.userId}/minihome`}>{item?.purchase}</Link>
        </div>
      </div>
    </div>
  );
};

export default ItemSideBar;
