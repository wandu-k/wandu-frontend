import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { ShopCategoryContext } from "../contexts/ShopCategoryContext";
import { Link } from "react-router-dom";
import ShopItemCard from "../components/shop/ShopItemCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ShopPage = () => {
  const { category } = useContext(ShopCategoryContext);
  const [categoryItems, setCategoryItems] = useState({}); // 카테고리 아이템을 관리하는 state

  const getList = async (category) => {
    try {
      const response = await axios.get(
        "http://localhost:7090/api/user/shop",

        {
          params: {
            categoryName: category.categoryName,
            page: 1,
            size: 12,
          },
          headers: { Authorization: localStorage.getItem("accessToken") },
        }
      );
      console.log(response.data.dtoList);
      return response.data.dtoList;
    } catch (error) {
      console.error("Error fetching shop data:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (category?.length > 0) {
        const itemsMap = {}; // 각 카테고리에 대한 아이템을 저장할 객체

        for (const cat of category) {
          console.log(cat.categoryName);
          const items = await getList(cat);
          itemsMap[cat.categoryName] = items; // 카테고리 이름을 key로 사용하여 아이템 저장
        }

        setCategoryItems(itemsMap); // 아이템을 state에 저장
      }
    };

    fetchData();
  }, [category]);

  return (
    <>
      <div className="flex flex-col w-full gap-4 p-4 relative">
        {category?.map((cat) => (
          <div
            key={cat.categoryName}
            className=" tracking-tight flex w-full flex-col gap-2"
          >
            <div className="text-2xl font-bold">{cat.categoryName}</div>
            <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 overflow-hidden">
              {/* 해당 카테고리에 대한 아이템 리스트를 출력 */}
              {categoryItems[cat.categoryName]?.map((item) => (
                <ShopItemCard key={item.itemId} item={item} />
              ))}
            </div>
          </div>
        ))}
        <div className="top-0 sticky">
          <Link
            to="add"
            className="h-14 w-14 m-4 content-center text-center bottom-16 right-0 bg-blue-600 py-1 rounded-full text-white text-xl absolute"
          >
            <FontAwesomeIcon icon="fa-solid fa-pen" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default ShopPage;
