import { createContext, useEffect, useState } from "react";
import api from "../apis/Api";
import * as auth from "../apis/Auth";
import { decode } from "base-64";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
    const { userId, hpId, email, rol } = userData;

    console.log(userData);
    console.log(userId);

    //유저정보 세팅
    const updateUserInfo = { userId, hpId, email, rol };
    setUserInfo(updateUserInfo);

    //로그인 여부
    setLogin(true);

    console.log("로그인 성공");

    //리다이렉트
    navigate(`minihome/${userId}`);
  };

  const logoutSetting = () => {
    api.defaults.headers.common.Authorization = undefined;
    localStorage.removeItem("accessToken");
    console.log("로그아웃");
    setLogin(false);
    setUserInfo(null);
  };

  const login = async (username, password) => {
    console.log(username);
    console.log(password);

    try {
      const response = await auth.login(username, password);
      const data = response.data;
      console.log(data);
      console.log(response.headers["authorization"]);
      const status = response.status;
      const accessToken = response.headers["authorization"];
      if (status === 200) {
        //토큰 저장
        localStorage.setItem("accessToken", accessToken);
        loginCheck();
      }
      console.log(accessToken);
      return { code: response.status };
    } catch (error) {
      if (error.response.status === 401) {
        return { code: error.response.status };
      }
    }
  };

  const logout = () => {
    setLogin(false);
  };

  const loginCheck = async () => {
    console.log("로그인 확인중..");
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);

    if (!accessToken) {
      console.log("토큰이 없습니다.");
      logoutSetting();
      return;
    }

    //jwt 헤더 설정
    api.defaults.headers.common.Authorization = `${accessToken}`;

    const payload = accessToken.substring(
      accessToken.indexOf(".") + 1,
      accessToken.lastIndexOf(".")
    );

    const jwtData = JSON.parse(decode(payload));
    const userId = jwtData.userId;

    console.log(jwtData);

    console.log(userId);

    let response;

    try {
      response = await auth.info(userId);
      const data = response.data;
      loginSetting(data, accessToken);
    } catch (error) {
      if (error.response.status === 422) {
        console.log("회원 정보가 존재하지 않습니다");
        logoutSetting();
      }
    }
  };

  return (
    <LoginContext.Provider
      value={{ isLogin, logout, login, loginCheck, userInfo }}
    >
      {children}
    </LoginContext.Provider>
  );
};
