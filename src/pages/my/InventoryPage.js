import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";
import axios from "axios";
import ShopItemCard from "../../components/shop/ShopItemCard";

const InventoryPage = () => {
  const navigate = useNavigate();
  const { userInfo, isLogin } = useContext(LoginContext);
  const [initialized, setInitialized] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (initialized && !isLogin) {
      navigate(`/login`);
    }
  }, [initialized, isLogin, navigate]);

  useEffect(() => {
    if (!isLogin) {
      // isLogin 정보가 준비될 때까지 대기
      return;
    }

    // isLogin 정보가 준비되면 초기화 완료로 표시
    setInitialized(true);
  }, [isLogin]); // isLogin이 변경될 때마다 실행

  useEffect(() => {
    if (isLogin) {
      axios
        .get(`http://localhost:7090/api/user/${userInfo.userId}/inventory`, {
          headers: { Authorization: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          console.log(response.data);
          setItems(response.data.dtoList);
        })
        .catch((error) => {});
    }
  }, [isLogin]);

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
