import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemSideBar from "../components/navigation/ItemSideBar";
import avatarBody from "../images/avatar/body.png";

const ItemPage = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:7090/api/user/shop?itemId=${itemId}`, {
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
      <div className="w-full p-4 flex gap-4 flex-col">
        <div className="w-full flex gap-4 h-full max-xl:flex-col">
          <div className="xl:w-3/5 w-full h-96 rounded-2xl overflow-hidden relative">
            <img
              src={item?.file}
              className="absolute inset-0 object-cover w-full h-full"
            ></img>
          </div>
          <div className="xl:w-2/5 w-full min-h-96 border rounded-2xl p-4 flex flex-col">
            <h2 className="font-bold text-xl">미리보기</h2>
            <div className=" relative h-full">
              <img
                src={avatarBody}
                className="w-full h-full absolute object-contain"
              ></img>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 w-full h-auto p-4">
        <ItemSideBar item={item}></ItemSideBar>
      </div>
    </>
  );
};

export default ItemPage;
