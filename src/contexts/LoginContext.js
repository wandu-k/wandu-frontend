import { isValidElement, useEffect, useState } from "react";
import api from "../apis/Api";

const LoginContext = ({ children }) => {
  //로그인 여부
  const [isLogin, setLogin] = useState(false);

  //유저정보
  const [userInfo, setUserInfo] = useState({});

  //권한 정보
  const [roles, setRoles] = useState({ isUser: false, isAdmin: false });

  // 로그인 세팅
  const loginSetting = (userData, accessToken) => {
    const { no, userId, authList } = userData;

    //jwt 헤더 설정
    api.defaults.headers.common.Authorization = `${accessToken}`;

    //토큰 저장
    localStorage.setItem("accessToken", accessToken);

    //유저정보 세팅
    const updateUserInfo = { no, userId, authList };
    setUserInfo(updateUserInfo);

    //로그인 여부
    setLogin(true);
  };

  const logoutSetting = () => {
    api.defaults.headers.common.Authorization = null;
    localStorage.removeItem("accessToken");
    setLogin(false);
    setUserInfo(null);
  };

  const logout = () => {
    setLogin(false);
  };

  useEffect(() => {});

  return (
    <LoginContext.Provider value={{ isLogin, logout }}>
      {children}
    </LoginContext.Provider>
  );
};
