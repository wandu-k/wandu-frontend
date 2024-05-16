import api from "./Api";

//로그인
export const login = (username, password) =>
  api.post(`http://localhost:7090/api/public/login`, { username, password });

//사용자 정보

export const info = (userID) =>
  api.get(`http://localhost:7090/api/user?userID=${userID}`);
