import React from "react";
import { Link } from "react-router-dom";

const ShopItemCard = ({ item }) => {
  const itemClasses = "w-full h-auto overflow-hidden";
  const imgClasses =
    "absolute object-cover h-full hover:scale-110 transition-all duration-300";
  const containerClasses =
    "relative rounded-2xl w-full aspect-square mb-1 overflow-hidden";

  return (
    <Link
      to={`/shop/item/${item.itemId}`}
      key={item.itemId}
      className={itemClasses}
    >
      <div className={containerClasses}>
        <img src={item.file} className={imgClasses} alt={item.itemName} />
      </div>
      <div>
        <p className="text-sm text-gray-500">{item.subcategoryName}</p>
        <h3>{item.itemName}</h3>
      </div>
    </Link>
  );
};

export default ShopItemCard;
