import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useOutletContext, useSearchParams } from "react-router-dom";
import InventoryItemCard from "../../components/inventory/InventoryItemCard";

const InventoryPage = () => {
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const userInfo = useOutletContext();

  useEffect(() => {
    if (userInfo?.userId) {
      axios
        .get(`http://localhost:7090/api/user/${userInfo?.userId}/inventory`, {
          params: { categoryName: searchParams.get("categoryName") },
          headers: { Authorization: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          console.log(response.data);
          setItems(response.data.dtoList);
        })
        .catch((error) => {
          console.error("Error fetching inventory:", error);
        });
    }
  }, [searchParams, userInfo]);

  // MyPage 컴포넌트의 나머지 부분

  return (
    <>
      <div className="w-full mt-20 p-4">
        <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 overflow-hidden">
          {items.map((item) => (
            <InventoryItemCard
              key={item.itemId}
              item={item}
              userInfo={userInfo}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default InventoryPage;
