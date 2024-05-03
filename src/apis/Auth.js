import api from "./Api";

//로그인
export const login = (username, password) =>
  api.post(
    `http://localhost:7090/api/user?username=${username}&password=${password}`
  );

//사용자 정보

export const info = () => api.get("http://localhost:7090/api/user");
