import { createContext, useEffect, useState, useCallback } from "react";
import api from "../apis/Api";
import * as auth from "../apis/Auth";
import { decode } from "base-64";
import { useNavigate } from "react-router-dom";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLogin, setLogin] = useState(false);
  const [userInfo, setUserInfo] = useState();

  const loginSetting = useCallback(
    (userData, accessToken) => {
      const { userId, nickname, profileImage, rol } = userData;
      console.log(userData);
      setUserInfo({ userId, nickname, profileImage, rol });
      setLogin(true);
      console.log("로그인 성공");
    },
    [navigate]
  );

  const logoutSetting = useCallback(() => {
    api.defaults.headers.common.Authorization = undefined;
    localStorage.removeItem("accessToken");
    console.log("로그아웃");
    setLogin(false);
    setUserInfo(null);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await auth.login(username, password);
      console.log(response.data);
      if (response.status === 200) {
        const accessToken = response.headers["authorization"];
        console.log(accessToken);
        localStorage.setItem("accessToken", accessToken);
        const payload = accessToken.split(".")[1];
        const jwtData = JSON.parse(decode(payload));
        loginSetting(jwtData, accessToken);
        navigate(`/${jwtData.userId}`);
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      logout();
    }
  };

  const logout = () => {
    logoutSetting();
  };

  const loginCheck = useCallback(async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.log("토큰이 없습니다.");
      logout();
      return;
    }

    api.defaults.headers.common.Authorization = accessToken;

    const payload = accessToken.split(".")[1];
    const jwtData = JSON.parse(decode(payload));
    const userId = jwtData.userId;
    console.log("로그인 확인중..", jwtData, userId);

    try {
      const response = await auth.info(userId);
      const data = response.data;
      loginSetting(data, accessToken);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.log("회원 정보가 존재하지 않습니다");
        logoutSetting();
      } else {
        console.error("Login check error:", error);
        logout();
      }
    }
  }, [loginSetting, logoutSetting]);

  useEffect(() => {
    loginCheck();
  }, [loginCheck]);

  return (
    <LoginContext.Provider
      value={{ isLogin, logout, login, loginCheck, userInfo }}
    >
      {children}
    </LoginContext.Provider>
  );
};