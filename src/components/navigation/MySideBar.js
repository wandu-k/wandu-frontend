import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "animate.css";

import UserInfoUi from "../userInfo/UserInfoUi";

const MySideBar = ({ userInfo }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col gap-4 h-full p-4 overflow-y-auto">
      <div className="w-full sm:border p-4 sm:rounded-2xl">
        <UserInfoUi userInfo={userInfo} />
      </div>
      <Link to={"/my/inventory"}>인벤토리</Link>
    </div>
  );
};

export default MySideBar;
