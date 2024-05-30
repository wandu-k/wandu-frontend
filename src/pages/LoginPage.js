import loginBackground from "../images/LoginBackground.webp";
import LoginForm from "../components/login/LoginForm";
import RegisterForm from "../components/login/RegisterForm";
import { LoginContext } from "../contexts/LoginContext";
import { useContext, useEffect, useState } from "react";

const LoginPage = () => {
  // 로그인 폼 상태
  const [loginFormVisible, setLoginFormVisible] = useState(true);

  // 로그인 폼을 토글하는 함수
  const toggleLoginForm = () => {
    setLoginFormVisible(!loginFormVisible);
  };

  return (
    <>
      <div className="absolute w-full h-full -z-50">
        <img
          src={loginBackground}
          alt="Login Background"
          className="absolute w-full h-full object-cover opacity-50"
        />
      </div>
      <div className="container flex my-auto mx-auto p-10 h-dvh gap-4">
        <div className="flex flex-col justify-center items-center w-full">
          <div>
            <h1 className="font-black text-8xl tracking-tighter">
              추억을 <br></br>
              <div className="text-lime-500">심다.</div>
            </h1>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-full">
          <div className="w-96 h-auto rounded-2xl backdrop-blur-md bg-white/75 border-slate-100 shadow-light p-8 flex flex-col gap-4">
            <div className="flex justify-center">
              <h1 className="font-black text-4xl tracking-tighter text-lime-800">
                완두콩
              </h1>
            </div>
            <div className="flex w-full justify-end gap-4 text-xs">
              {loginFormVisible ? (
                <>
                  <label>회원이 아니신가요?</label>
                  <button
                    className="text-lime-500 font-bold"
                    type="button"
                    onClick={toggleLoginForm}
                  >
                    회원가입
                  </button>
                </>
              ) : (
                <>
                  <label>이미 회원이신가요?</label>
                  <button
                    className="text-lime-500 font-bold"
                    type="button"
                    onClick={toggleLoginForm}
                  >
                    로그인
                  </button>
                </>
              )}
            </div>
            {loginFormVisible ? (
              <>
                <LoginForm></LoginForm>
              </>
            ) : (
              <>
                {" "}
                <RegisterForm></RegisterForm>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
