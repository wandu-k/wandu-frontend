import React, {
  useState,
  useContext,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";
import profile from "../../images/basic/profile.png";
import LoginModal from "../modal/LoginModal";
import ItemCategoryMenu from "./ItemCategoryMenu";

const NavigationUi = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { userInfo, isLogin } = useContext(LoginContext);
  const { userId: paramUserId } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [here, setHere] = useState("");
  const [profileDropMenu, setProfileDropMenu] = useState(false);
  const dropMenu = useRef(null);
  const dropMenuButton = useRef(null);

  useEffect(() => {
    // 특정 영역 외 클릭 시 발생하는 이벤트
    const handleFocus = (e) => {
      if (
        dropMenu.current &&
        !dropMenu.current.contains(e.target) &&
        dropMenuButton.current &&
        !dropMenuButton.current.contains(e.target)
      ) {
        setProfileDropMenu(false);
      }
    };

    // 이벤트 리스너에 handleFocus 함수 등록
    document.addEventListener("mouseup", handleFocus);
    return () => {
      document.removeEventListener("mouseup", handleFocus);
    };
  }, []);

  useEffect(() => {
    setProfileDropMenu(false);
  }, [location.pathname]);

  const userId = paramUserId || userInfo?.userId;

  const openModal = useCallback(() => setModalIsOpen(true), []);
  const closeModal = useCallback(() => setModalIsOpen(false), []);

  const loginCheck = useCallback(
    (event) => {
      if (!isLogin) {
        event.preventDefault(); // Prevent default navigation
        openModal();
      }
    },
    [isLogin, openModal]
  );

  const handleDropMenu = useCallback(() => {
    if (!isLogin) {
      navigate(`/login`);
      return;
    }

    setProfileDropMenu((prev) => !prev);
  }, [isLogin, navigate]);

  const handleBack = useCallback(() => navigate(-1), [navigate]);

  const onErrorProfileImg = useCallback((e) => {
    e.target.src = profile;
  }, []);

  const userContent = useMemo(() => {
    if (
      location.pathname.includes(`/${userId}`) ||
      (location.pathname.includes("/my") &&
        !location.pathname.includes("inventory"))
    ) {
      return (
        <>
          <NavLink
            to={`/${userId}/minihome`}
            className={({ isActive }) => (isActive ? "text-lime-500" : "")}
          >
            마이룸
          </NavLink>
          <NavLink
            to={`/${userId}/diary`}
            className={({ isActive }) => (isActive ? "text-lime-500" : "")}
          >
            스토리북
          </NavLink>
          <NavLink
            to={`/${userId}/album`}
            className={({ isActive }) => (isActive ? "text-lime-500" : "")}
          >
            앨범
          </NavLink>
          <NavLink
            to={`/${userId}/guest`}
            className={({ isActive }) => (isActive ? "text-lime-500" : "")}
          >
            방명록
          </NavLink>
        </>
      );
    } else if (
      location.pathname.includes("/shop") ||
      location.pathname.includes("/my/inventory")
    ) {
      return <ItemCategoryMenu />;
    }
    return null;
  }, [location.pathname, userId, searchParams]);

  return (
    <nav className="w-full flex flex-col justify-end py-2 h-20 relative">
      {profileDropMenu && (
        <div
          ref={dropMenu}
          className="top-20 w-56 text-sm right-0 absolute flex flex-col border rounded-2xl bg-white dark:bg-zinc-950 dark:border-none p-4 gap-4"
        >
          <>
            <Link to={"/my"}>내 정보</Link>
            <Link to={"/my/inventory"}>인벤토리</Link>
            <Link to={"/logout"}>로그아웃</Link>
          </>
        </div>
      )}
      <div className="flex justify-between font-bold container mx-auto tracking-tighter">
        <div className="h-full content-center flex gap-4 text-xl">
          <div className="content-center">완두콩</div>
          <div className="flex gap-2 sm:gap-4 md:gap-12">{userContent}</div>
        </div>
        <div className="font-bold text-xl">{here}</div>
        <div className="flex gap-4 items-center">
          <Link
            to={isLogin ? `/${userInfo?.userId}/minihome` : "#"}
            onClick={loginCheck}
          >
            <FontAwesomeIcon icon="fa-solid fa-house" />
          </Link>
          <Link to="/shop">
            <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
          </Link>
          <Link to="#">
            <FontAwesomeIcon icon="fa-solid fa-ranking-star" />
          </Link>
          <div className={userInfo ? "" : "hidden"}>
            <Link
              to={isLogin ? `/charge` : "/login"}
              className="flex items-center gap-2"
            >
              {userInfo?.point}
            </Link>
          </div>
          <button
            ref={dropMenuButton}
            type="button"
            onClick={handleDropMenu}
            className="flex items-center gap-2"
          >
            <div className="w-6 h-6 relative rounded-full overflow-hidden">
              <img
                src={userInfo?.profileImage || profile}
                className="absolute object-cover"
                onError={onErrorProfileImg}
              />
            </div>
            {userInfo ? userInfo.nickname : "로그인"}
          </button>
        </div>
      </div>
      <LoginModal isOpen={modalIsOpen} onRequestClose={closeModal} />
    </nav>
  );
};
export default NavigationUi;
