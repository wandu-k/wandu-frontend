import api from "./Api";

//로그인
export const login = (username, password) =>
  api.post(`http://wookportfolio.duckdns.org:8082/api/public/login`, { username, password });

//사용자 정보

export const info = (userId) => api.get(`http://wookportfolio.duckdns.org:8082/api/user`);
