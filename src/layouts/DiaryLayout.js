import { NavLink, Outlet, useParams } from "react-router-dom";

const DiaryLayout = () => {
  return (
    <>
      <div className="flex w-full h-full pt-20 pb-16">
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default DiaryLayout;
