import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import axios from "axios";
import ShopItemCard from "../../components/shop/ShopItemCard";
import { useOutletContext } from "react-router-dom";

const InventoryPage = () => {
  const [items, setItems] = useState([]);
  const userInfo = useOutletContext();

  useEffect(() => {
    axios
      .get(`http://localhost:7090/api/user/${userInfo.userId}/inventory`, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        console.log(response.data);
        setItems(response.data.dtoList);
      })
      .catch((error) => {});
  }, []);

  // MyPage 컴포넌트의 나머지 부분

  return (
    <>
      <div className="w-full mt-20 p-4">
        <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 overflow-hidden">
          {items.map((item) => (
            <ShopItemCard key={item.itemId} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default InventoryPage;
