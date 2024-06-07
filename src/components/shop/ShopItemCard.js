import React from "react";
import { Link } from "react-router-dom";

const ShopItemCard = ({ item }) => {
  return (
    <Link
      to={`/shop/item/${item.itemId}`}
      key={item.itemId}
      className="w-full h-auto overflow-hidden border rounded-2xl"
    >
      <div className="relative rounded-2xl w-full aspect-square mb-1 overflow-hidden">
        <img
          src={item.file}
          className="absolute object-cover h-full hover:scale-110 transition-all duration-300"
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
