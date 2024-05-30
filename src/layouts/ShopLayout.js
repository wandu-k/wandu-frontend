import { Outlet } from "react-router-dom";
import SideBar from "../components/navigation/SideBar";

const ShopLayout = () => {
  return (
    <>
      <div className="h-dvh w-dvw pt-20 pb-16 flex justify-end">
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default ShopLayout;
