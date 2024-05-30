import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";
import profile from "../../images/basic/profile.png";
import LoginModal from "../modal/LoginModal";
import axios from "axios";

const NavigationUi = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo, isLogin } = useContext(LoginContext);
  const { userId, categoryName } = useParams();
  const [category, setCategory] = useState(null); // Correctly initialize useState
  const [modalIsOpen, setModalIsOpen] = useState(false);
  let content;

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const loginCheck = (event) => {
    if (!isLogin) {
      event.preventDefault(); // Prevent default navigation
      openModal();
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const onErrorProfileImg = (e) => {
    e.target.src = profile;
  };

  if (location.pathname.includes(`/${userId}`)) {
    content = (
      <div className="flex gap-12 text-2xl font-bold tracking-tighter">
        <NavLink
          to={`/${userId}/minihome`}
          className={({ isActive }) =>
            isActive ? "text-lime-500" : "text-black"
          }
        >
          미니홈
        </NavLink>
        <NavLink
          to={`/${userId}/diary`}
          className={({ isActive }) =>
            isActive ? "text-lime-500" : "text-black"
          }
        >
          다이어리
        </NavLink>
        <NavLink
          to={`/${userId}/picture`}
          className={({ isActive }) =>
            isActive ? "text-lime-500" : "text-black"
          }
        >
          사진첩
        </NavLink>
        <NavLink
          to={`/${userId}/guest`}
          className={({ isActive }) =>
            isActive ? "text-lime-500" : "text-black"
          }
        >
          방명록
        </NavLink>
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
  }

  useEffect(() => {
    if (location.pathname.includes("/shop")) {
      axios
        .get("http://localhost:7090/api/public/shop/category")
        .then((response) => {
          setCategory(response.data);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    }
  }, [location.pathname]);

  if (location.pathname.includes("/shop")) {
    content = (
      <div className="flex gap-12 text-2xl font-bold tracking-tighter">
        <NavLink
          to={`/shop`}
          className={({ isActive }) =>
            isActive ? "text-lime-500" : "text-black"
          }
          end
        >
          전체
        </NavLink>
        {category?.map((category) => (
          <NavLink
            key={category.categoryName}
            to={`/shop/${category.categoryName}`}
            className={({ isActive }) =>
              isActive ? "text-lime-500" : "text-black"
            }
          >
            {category.categoryName}
          </NavLink>
        ))}
      </div>
    );
  }

  return (
    <nav className="w-full flex flex-col justify-end p-2 h-20">
      <div className=" h-full font-bold content-center">
        <button onClick={handleBack} className="flex gap-2 items-center">
          <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
          뒤로가기
        </button>
      </div>
      <div className="flex justify-between max-sm:hidden">
        {content}
        <div className="flex gap-4 items-center">
          <Link to={`${userInfo?.userId}`} onClick={loginCheck}>
            <FontAwesomeIcon icon="fa-solid fa-house" />
          </Link>
          <Link to={"/shop"}>
            <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
          </Link>
          <Link>
            <FontAwesomeIcon icon="fa-solid fa-ranking-star" />
          </Link>
          <button className="flex items-center gap-2">
            <div className="w-6 h-6 relative rounded-full overflow-hidden">
              <img
                src={userInfo ? userInfo.profileImage : profile}
                className="absolute object-cover"
                onError={onErrorProfileImg}
              ></img>
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
