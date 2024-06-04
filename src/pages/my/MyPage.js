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

  return (
    <>
      <div className="w-full mt-20 mb-16 p-4 flex gap-4 flex-col">
        <div className=" h-48 border rounded-2xl p-4">
          <div className="text-xl font-bold tracking-tight">계정정보 설정</div>
        </div>
        <div className=" h-48 border rounded-2xl p-4">
          <div className="text-xl font-bold tracking-tight">
            알람 및 이메일 수신 설정
          </div>
        </div>
        <div className=" h-48 border rounded-2xl p-4">
          <div className="text-xl font-bold tracking-tight">비밀번호 변경</div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
