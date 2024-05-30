import React from "react";
import UserInfo from "./UserInfo";
import profile from "../../images/basic/profile.png";
import { Link, NavLink, useParams } from "react-router-dom";

const UserInfoUi = () => {
  const userId = useParams();
  return (
    <div className="w-full">
      <UserInfo>
        {({ user }) => (
          <div>
            <h2 className="text-xl font-semibold">
              {user ? user.nickname : "NONE"}
            </h2>
            <div className="flex justify-between items-center">
              <div className="w-16 h-16 relative rounded-full overflow-hidden">
                <img
                  src={user ? user.profileImage : profile}
                  alt="이미지"
                  className="absolute object-cover"
                />
              </div>
              <div className="flex gap-4">
                <Link
                  to={`${user?.userId}/follower`}
                  className=" text-center hover:backdrop-brightness-75 rounded-md p-2"
                >
                  <div className="font-bold">
                    {user ? user.followCount : "0"}
                  </div>
                  <div>팔로잉</div>
                </Link>
                <button className="hover:backdrop-brightness-75 rounded-md p-2">
                  <div className="font-bold">
                    {user ? user.followerCount : "0"}
                  </div>
                  <div>팔로워</div>
                </button>
              </div>
            </div>
            <div>{user ? user.intro : ""}</div>
            <div className="text-gray-400">
              가입일:{user ? user.signupDay : "2024년 6월"}
            </div>
          </div>
        )}
      </UserInfo>
    </div>
  );
};

export default UserInfoUi;
