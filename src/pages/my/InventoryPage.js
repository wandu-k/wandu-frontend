import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useOutletContext, useSearchParams } from "react-router-dom";
import InventoryItemCard from "../../components/inventory/InventoryItemCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InventoryPage = () => {
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const userInfo = useOutletContext();

  useEffect(() => {
    if (userInfo?.userId) {
      axios
        .post(
          `https://wookportfolio.duckdns.org:8082/api/user/${userInfo?.userId}/inventory/list`,
          { categoryName: searchParams.get("categoryName") },
          {
            headers: { Authorization: localStorage.getItem("accessToken") },
          }
        )
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
        {items.length > 0 ? (
          <>
            {" "}
            <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 overflow-hidden">
              {items.map((item) => (
                <InventoryItemCard
                  key={item.itemId}
                  item={item}
                  userInfo={userInfo}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col justify-center h-full pb-16 items-center">
              <Link
                to={"/shop"}
                className="flex flex-col justify-center pb-16 items-center"
              >
                <div className="font-bold text-2xl">아이템이 없습니다!</div>
                <div className="flex gap-2 items-center">
                  <div>상점으로 바로가기</div>
                  <FontAwesomeIcon icon="fa-solid fa-up-right-from-square" />
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default InventoryPage;
