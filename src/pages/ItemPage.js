import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemSideBar from "../components/navigation/ItemSideBar";
import avatarBody from "../images/avatar/body.png";
import defaultAlbum from "../images/shop/album.png";
import ReactPlayer from "react-player";

const ItemPage = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:7090/api/user/shop/${itemId}`, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        console.log(response.data);
        setItem(response.data);
      })
      .catch((error) => {});
  }, []);
  return (
    <>
      <div className="flex justify-center w-full pb-16 pt-20 relative max-lg:flex-col">
        <div className="w-full p-4 flex gap-4 flex-col">
          <div className="w-full flex gap-4 h-full max-xl:flex-col">
            <div className=" w-full aspect-square rounded-2xl overflow-hidden relative">
              <img
                src={
                  item?.categoryId == 1
                    ? item?.file
                    : item?.thumbnail
                    ? item?.thumbnail
                    : defaultAlbum
                }
                className="absolute inset-0 object-cover w-full h-full"
              ></img>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 w-full h-auto p-4">
          <ItemSideBar item={item}></ItemSideBar>
        </div>
      </div>
    </>
  );
};

export default ItemPage;
