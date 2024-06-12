import FollowButton from "./FollowButton";
import profile from "../../images/basic/profile.png";
import { Link } from "react-router-dom";

const FollowUserList = ({ user, index }) => {
  return (
    <Link
      to={`/${user.friendId}/minihome`}
      key={index}
      className="p-4 flex gap-2 w-full"
    >
      <div className="min-w-11 min-h-11 h-11 aspect-square rounded-full overflow-hidden relative">
        <img
          className=" absolute inset-0 w-full h-full object-cover"
          src={user?.profileImage || profile}
        />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center">
          <div className="font-bold">{user?.nickname}</div>
          <FollowButton user={user}></FollowButton>
        </div>
        <div className="">{user?.intro}</div>
      </div>
    </Link>
  );
};

export default FollowUserList;
