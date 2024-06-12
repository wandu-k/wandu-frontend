import { useContext, useState } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import { useForm } from "react-hook-form";
import naver from "../../images/login/naver.png";
import google from "../../images/login/google.png";

const LoginForm = () => {
  const { register, handleSubmit, error } = useForm();
  const [code, setCode] = useState(0);

  const { login } = useContext(LoginContext);

  const onSubmit = async (data) => {
    const { username, password } = data;

    const code = await login(username, password);
    console.log(code);
    setCode(code);
  };
  return (
    <>
      <form
        className="flex flex-col justify-between gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="username">이메일</label>
            <input
              type="email"
              id="username"
              name="username"
              {...register("username", { required: true })}
              className="bg-white border rounded-xl h-10 px-4"
            ></input>
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              className="bg-white border rounded-xl h-10 px-4"
              {...register("password", { required: true })}
            ></input>
            <div className="text-right">
              <button className="text-xs">비밀번호를 잊으셨나요?</button>
            </div>
          </div>
          {code === 401 ? (
            <>
              {" "}
              <div className="text-center p-3 bg-red-400 text-white rounded-2xl border-red-500 border">
                계정을 찾을 수 없습니다.
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="bg-lime-500 text-white font-bold w-full h-12 rounded-2xl"
          >
            로그인
          </button>
        </div>
      </form>
      <div className="text-center">또는</div>
      <div className="flex justify-between items-center">
        <button className="w-14 h-14">
          <img src={naver} alt="naver"></img>
        </button>
        <button className="w-14 h-14">
          <img src={google} className="w-full h-full"></img>
        </button>
        <div className="border h-4"></div>
        <button>QR로그인</button>
      </div>
    </>
  );
};

export default LoginForm;
