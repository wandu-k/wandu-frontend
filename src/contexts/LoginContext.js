import { createContext, useEffect, useState } from "react";
import api from "../apis/Api";
import * as auth from "../apis/Auth";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
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
    api.defaults.headers.common.Authorization = undefined;
    localStorage.removeItem("accessToken");
    setLogin(false);
    setUserInfo(null);
  };

  const login = async (username, password) => {
    console.log(username);
    console.log(password);

    const response = await auth.login(username, password);
    const data = response.data;
    console.log(data);

    const status = response.headers;
    //const authorization = headers.authorization;
    //const accessToken = authorization.accessToken;

    // if (status === 200) {
    //   alert("로그인 성공");
    //   loginSetting();
    // }
  };

  const logout = () => {
    setLogin(false);
  };

  useEffect(() => {});

  return (
    <LoginContext.Provider value={{ isLogin, logout, login }}>
      {children}
    </LoginContext.Provider>
  );
};
