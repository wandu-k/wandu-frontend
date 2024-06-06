import React, { useState, useContext, useMemo, useEffect } from "react";
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

  const userId = paramUserId || userInfo?.userId;

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const loginCheck = (event) => {
    if (!isLogin) {
      event.preventDefault(); // Prevent default navigation
      openModal();
    }
  };

  const handleBack = () => navigate(-1);

  const onErrorProfileImg = (e) => {
    e.target.src = profile;
  };

  const userContent = useMemo(() => {
    if (
      location.pathname.includes(`/${userId}`) ||
      (location.pathname.includes("/my") &&
        !location.pathname.includes("inventory"))
    ) {
      return (
        <>
          {["minihome", "diary", "picture", "guest"].map((section) => (
            <NavLink
              key={section}
              to={`/${userId}/${section}`}
              className={({ isActive }) =>
                isActive ? "text-lime-500" : "text-black"
              }
            >
              {section === "minihome"
                ? "홈"
                : section === "diary"
                ? "다이어리"
                : section === "picture"
                ? "사진첩"
                : "방명록"}
            </NavLink>
          ))}
        </>
      );
    } else if (
      location.pathname.includes("/shop") ||
      location.pathname.includes("/my/inventory")
    ) {
      return (
        <>
          <ItemCategoryMenu></ItemCategoryMenu>
        </>
      );
      // } else if (
      //   location.pathname.includes("/my") &&
      //   !location.pathname.includes("inventory")
      // ) {
      //   return (
      //     <>
      //       {/* <NavLink
      //         to={`/my`}
      //         end
      //         className={({ isActive }) =>
      //           isActive ? "text-lime-500" : "text-black"
      //         }
      //       >
      //         내 정보
      //       </NavLink>
      //       {["account", "ticket"].map((section) => (
      //         <NavLink
      //           key={section}
      //           to={`/my/${section}`}
      //           className={({ isActive }) =>
      //             isActive ? "text-lime-500" : "text-black"
      //           }
      //         >
      //           {section === "account" ? "계정" : "문의"}
      //         </NavLink>
      //       ))} */}
      //     </>
      //   );
    }
    return null;
  }, [location.pathname, userId, searchParams]);

  return (
    <nav className="w-full flex flex-col justify-end py-2 h-20">
      <div className="flex justify-between  font-bold container mx-auto tracking-tighter">
        <div className="h-full content-center flex gap-4 text-xl">
          <div className="content-center">완두콩 </div>
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
          <Link
            to={isLogin ? `/my` : "/login"}
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
          </Link>
        </div>
      </div>
      <LoginModal isOpen={modalIsOpen} onRequestClose={closeModal} />
    </nav>
  );
};
export default NavigationUi;
