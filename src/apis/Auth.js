import api from "./Api";

//로그인
export const login = (username, password) =>
  api.post(`/api/public/login`, { username, password });

//사용자 정보

export const info = (userId) => api.get(`/api/user`);
