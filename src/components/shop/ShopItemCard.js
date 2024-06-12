import React from "react";
import { Link } from "react-router-dom";
import defaultAlbum from "../../images/shop/album.png";
import previewAvatar from "../../images/avatar/body.png";

const ShopItemCard = ({ item }) => {
  return (
    <Link
      to={`/shop/item/${item.itemId}`}
      key={item.itemId}
      className="w-full h-auto overflow-hidden border rounded-2xl"
    >
      <div className="relative rounded-2xl w-full aspect-square mb-1 overflow-hidden hover:scale-110 transition-all duration-300">
        <img
          src={
            item.categoryId == 1
              ? item.file
              : item.thumbnail
              ? item.thumbnail
              : defaultAlbum
          }
          className="absolute object-cover h-full "
          alt={item.itemName}
        />
        <img
          src={previewAvatar}
          className="absolute object-cover h-full -z-40 brightness-150 grayscale"
          alt={item.itemName}
        />
      </div>
      <div className=" p-4">
        <p className="text-sm text-gray-500">{item.subcategoryName}</p>
        <h3>{item.itemName}</h3>
      </div>
    </Link>
  );
};

export default ShopItemCard;
