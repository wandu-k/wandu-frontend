import { createContext, useEffect, useState } from "react";
import api from "../apis/Api";
import * as auth from "../apis/Auth";
import { decode } from "base-64";
import { useNavigate } from "react-router-dom";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const navigate = useNavigate();

  //로그인 여부
  const [isLogin, setLogin] = useState(false);

  //유저정보
  const [userInfo, setUserInfo] = useState({});

  //권한 정보
  const [roles, setRoles] = useState({ isUser: false, isAdmin: false });

  // 로그인 세팅
  const loginSetting = (userData, accessToken) => {
    const { userid, hpID, email, rol } = userData;

    //jwt 헤더 설정
    api.defaults.headers.common.Authorization = `${accessToken}`;

    console.log(userData);
    console.log(userid);

    //유저정보 세팅
    const updateUserInfo = { userid, hpID, email, rol };
    setUserInfo(updateUserInfo);

    //로그인 여부
    setLogin(true);

    //리다이렉트
    navigate(`../minihome/${userid}`);
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
    console.log(response.headers["authorization"]);
    const status = response.status;
    const accessToken = response.headers["authorization"].replace(
      "Bearer ",
      ""
    );

    console.log(accessToken);
    if (status === 200) {
      //토큰 저장
      localStorage.setItem("accessToken", accessToken);
      alert("로그인 성공");
      loginCheck();
      //loginSetting();
    }
  };

  const logout = () => {
    setLogin(false);
  };

  const loginCheck = async () => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);

    if (!accessToken) {
      console.log("토큰이 없습니다.");
      logoutSetting();
      return;
    }

    const payload = accessToken.substring(
      accessToken.indexOf(".") + 1,
      accessToken.lastIndexOf(".")
    );

    console.log(payload);

    const data = JSON.parse(decode(payload));

    loginSetting(data, accessToken);
  };

  useEffect(() => {});

  return (
    <LoginContext.Provider value={{ isLogin, logout, login }}>
      {children}
    </LoginContext.Provider>
  );
};
