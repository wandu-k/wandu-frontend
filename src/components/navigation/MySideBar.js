import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "animate.css";

import UserInfoUi from "../userInfo/UserInfoUi";

const MySideBar = ({ userInfo }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col gap-4 h-full p-4 overflow-y-auto ">
      <div className="w-full sm:border p-4 sm:rounded-2xl">
        <UserInfoUi userInfo={userInfo} />
      </div>
      <div className="flex font-bold flex-col gap-6">
        <Link to={"/my"} className="flex justify-between items-center">
          내정보
          <FontAwesomeIcon icon="fa-solid fa-up-right-from-square" />
        </Link>
        <Link
          to={"/my/inventory"}
          className="flex justify-between items-center"
        >
          인벤토리
          <FontAwesomeIcon icon="fa-solid fa-up-right-from-square" />
        </Link>
        <Link to={"/my/account"} className="flex justify-between items-center">
          계정설정
          <FontAwesomeIcon icon="fa-solid fa-up-right-from-square" />
        </Link>
      </div>
    </div>
  );
};

export default MySideBar;
