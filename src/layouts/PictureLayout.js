import { Outlet } from "react-router-dom";

const PictureLayout = () => {
  return (
    <>
      <div className="flex justify-center w-full h-dvh pb-16 pt-20 relative">
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default PictureLayout;
