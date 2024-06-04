import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";

const MyPage = () => {
  const navigate = useNavigate();
  const { userInfo, isLogin } = useContext(LoginContext);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized && !isLogin) {
      navigate(`/login`);
    }
  }, [initialized, isLogin, navigate]);

  useEffect(() => {
    if (!isLogin) {
      // isLogin 정보가 준비될 때까지 대기
      return;
    }

    // isLogin 정보가 준비되면 초기화 완료로 표시
    setInitialized(true);
  }, [isLogin]); // isLogin이 변경될 때마다 실행

  // MyPage 컴포넌트의 나머지 부분
};

export default MyPage;
