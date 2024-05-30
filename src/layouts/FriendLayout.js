import { Outlet } from "react-router-dom";
const FriendLayout = () => {
  return (
    <>
      <div>팔로잉</div>
      <div>팔로워</div>
      <Outlet></Outlet>
    </>
  );
};

export default FriendLayout;
