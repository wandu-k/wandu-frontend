import { Outlet } from "react-router-dom";

const ShopLayout = () => {
  return (
    <>
      <div className="flex justify-center w-full pb-16 pt-20 relative max-lg:flex-col">
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default ShopLayout;
