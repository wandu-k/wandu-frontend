import loginBackground from "../images/LoginBackground.webp";
import LoginForm from "../components/login/LoginForm";
import { LoginProvider } from "../contexts/LoginContext";

const LoginPage = () => {
  return (
    <>
      <LoginProvider>
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
              <LoginForm></LoginForm>
            </div>
          </div>
        </div>
      </LoginProvider>
    </>
  );
};

export default LoginPage;
