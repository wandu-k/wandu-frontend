import { Outlet } from "react-router-dom";
import SideBar from "../components/navigation/SideBar";

const ProfileLayout = () => {
  return (
    <>
      <Outlet></Outlet>
      <div className=" min-w-96 h-auto mt-20 mb-16">
        <SideBar></SideBar>
      </div>
    </>
  );
};

export default ProfileLayout;
