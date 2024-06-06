import { useContext } from "react";
import { ShopCategoryContext } from "../../contexts/ShopCategoryContext";
import {
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const ItemCategoryMenu = () => {
  const { category } = useContext(ShopCategoryContext);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleCategoryClick = (cat) => {
    const currentPath = location.pathname;
    const categoryName = cat.categoryName;
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("categoryName", categoryName);

    if (currentPath === "/shop") {
      navigate(`/shop/item?categoryName=${categoryName}`);
    } else if (
      currentPath.startsWith("/shop/item") ||
      currentPath === "/my/inventory"
    ) {
      navigate(`${currentPath.split("?")[0]}?${newSearchParams.toString()}`);
    }
  };

  const getNavLinkTo = () => {
    if (location.pathname.includes("/shop")) {
      return "/shop";
    } else if (location.pathname === "/my/inventory") {
      return "/my/inventory";
    }
    return "/shop"; // 기본 경로
  };

  return (
    <>
      <NavLink
        to={getNavLinkTo()}
        className={({ isActive }) =>
          !searchParams.toString() && isActive ? "text-lime-500" : "text-black"
        }
        end
      >
        전체
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
    </>
  );
};

export default ItemCategoryMenu;
