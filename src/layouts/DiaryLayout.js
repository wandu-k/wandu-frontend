import { NavLink, Outlet, useParams } from "react-router-dom";
import SideBar from "../components/navigation/SideBar";

const DiaryLayout = () => {
  return (
    <>
      <Outlet></Outlet>
    </>
  );
};

export default DiaryLayout;
