import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { ShopCategoryContext } from "../contexts/ShopCategoryContext";
import { Link } from "react-router-dom";
import ShopItemCard from "../components/shop/ShopItemCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ShopPage = () => {
  const { category } = useContext(ShopCategoryContext);
  const [avatarItems, setAvatarItems] = useState([]);
  const [musicItems, setMusicItems] = useState([]);

  useEffect(() => {
    axios
      .post(
        "http://localhost:7090/api/user/shop/list",
        { categoryName: "아바타", page: 1, size: 12 },
        {
          headers: { Authorization: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        console.log(response.data);
        setAvatarItems(response.data.dtoList);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    axios
      .post(
        "http://localhost:7090/api/user/shop/list",
        { categoryName: "음악", page: 1, size: 12 },
        {
          headers: { Authorization: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        console.log(response.data);
        setMusicItems(response.data.dtoList);
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      <div className="flex justify-center w-full pb-16 pt-20 relative max-lg:flex-col">
        <div className="flex flex-col w-full gap-4 p-4 relative">
          <div className=" tracking-tight flex w-full flex-col gap-2">
            <div className="text-2xl font-bold">아바타</div>
            <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 overflow-hidden">
              {avatarItems?.map((item) => (
                <ShopItemCard key={item.itemId} item={item} />
              ))}
            </div>
            <div className="text-2xl font-bold">음악</div>
            <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 overflow-hidden">
              {musicItems?.map((item) => (
                <ShopItemCard key={item.itemId} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="top-0 h-dvh sticky pt-20 pb-16">
        <Link
          to="/shop/add"
          className="h-14 w-14 m-4 content-center text-center bottom-16 right-0 bg-blue-600 py-1 rounded-full text-white text-xl absolute"
        >
          <FontAwesomeIcon icon="fa-solid fa-plus" />
        </Link>
      </div>
    </>
  );
};

export default ShopPage;
