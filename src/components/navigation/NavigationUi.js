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
import { ShopCategoryContext } from "../../contexts/ShopCategoryContext";

const NavigationUi = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { userInfo, isLogin } = useContext(LoginContext);
  const { category } = useContext(ShopCategoryContext);
  const { userId } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [here, setHere] = useState("");

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const loginCheck = (event) => {
    if (!isLogin) {
      event.preventDefault(); // Prevent default navigation
      openModal();
    }
  };

  const handleBack = () => navigate(-1);

  const handleCategoryClick = (cat) => {
    const currentPath = location.pathname;
    if (currentPath === "/shop" || !currentPath.startsWith("/shop/item")) {
      navigate(`/shop/item?categoryName=${cat.categoryName}`);
    } else if (currentPath.startsWith("/shop/item")) {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set("categoryName", cat.categoryName);
      navigate(`/shop/item?${newSearchParams.toString()}`);
    }
  };

  const onErrorProfileImg = (e) => {
    e.target.src = profile;
  };

  const userContent = useMemo(() => {
    if (location.pathname.includes(`/${userId}`)) {
      return (
        <div className="flex gap-12 text-2xl font-bold tracking-tighter">
          {["minihome", "diary", "picture", "guest"].map((section) => (
            <NavLink
              key={section}
              to={`/${userId}/${section}`}
              className={({ isActive }) =>
                isActive ? "text-lime-500" : "text-black"
              }
            >
              {section === "minihome"
                ? "미니홈"
                : section === "diary"
                ? "다이어리"
                : section === "picture"
                ? "사진첩"
                : "방명록"}
            </NavLink>
          ))}
          <NavLink
            to={`/${userId}`}
            end
            className={({ isActive }) =>
              isActive ? "text-lime-500" : "text-black"
            }
          >
            프로필
          </NavLink>
        </div>
      );
    } else if (location.pathname.includes("/shop")) {
      return (
        <div className="flex gap-12 text-2xl font-bold tracking-tighter">
          <NavLink
            to={`/shop`}
            className={({ isActive }) =>
              isActive ? "text-lime-500" : "text-black"
            }
            end
          >
            홈
          </NavLink>
          {category?.map((cat) => (
            <button
              key={cat.categoryName}
              type="button"
              onClick={() => handleCategoryClick(cat)}
              className={
                searchParams.get("categoryName") === cat.categoryName
                  ? "text-lime-500"
                  : "text-black"
              }
            >
              {cat.categoryName}
            </button>
          ))}
        </div>
      );
    }
    return null;
  }, [location.pathname, userId, category, searchParams]);

  return (
    <nav className="w-full flex flex-col justify-end py-2 h-20 px-12">
      <div className="h-full font-bold content-center">
        <button onClick={handleBack} className="flex gap-2 items-center">
          <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
          뒤로가기
        </button>
      </div>
      <div className="flex justify-between max-sm:hidden">
        {userContent}
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
