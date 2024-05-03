import api from "./Api";

//로그인
export const login = (username, password) =>
  api.post(`/api/user?username=${username}&password=${password}`);

//사용자 정보

export const info = () => api.get("/api/user");
