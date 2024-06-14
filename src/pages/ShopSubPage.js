import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import ShopItemCard from "../components/shop/ShopItemCard";

const ShopSubPage = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .post(
        "/api/user/shop/list",
        {
          categoryName: searchParams.get("categoryName"),
          userId: searchParams.get("userId"),
          nickname: searchParams.get("nickname"),
        },

        {
          headers: { Authorization: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        console.log(response.data.dtoList);
        setItems(response.data.dtoList);
        setLoading(false);
      })
      .catch((error) => {
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
        setLoading(false);
      });
  }, [searchParams]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex justify-center w-full pb-16 pt-20 relative max-lg:flex-col">
      <div className="flex flex-col w-full gap-4 p-4">
        <div className="text-2xl font-bold">
          {searchParams.get("userId") && searchParams.get("nickname")
            ? searchParams.get("nickname")
            : searchParams.get("categoryName")}
        </div>
        <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 overflow-hidden">
          {items?.map((item) => (
            <ShopItemCard key={item.itemId} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopSubPage;
