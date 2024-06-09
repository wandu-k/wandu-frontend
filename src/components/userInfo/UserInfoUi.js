import React, { useEffect } from "react";
import UserInfo from "./UserInfo";
import profile from "../../images/basic/profile.png";
import { Link, NavLink, useParams } from "react-router-dom";
import { format } from "date-fns";

const UserInfoUi = ({ userInfo }) => {
  return (
    <UserInfo userInfo={userInfo}>
      {({ user }) => {
        const displayUser = user || userInfo;

        return (
          <div className="flex flex-col gap-2 ">
            <h2 className="text-xl font-semibold">{displayUser?.nickname}</h2>
            <div className="flex justify-between items-center">
              <div className="w-16 h-16 relative rounded-full overflow-hidden">
                <img
                  src={displayUser?.profileImage || profile}
                  alt="이미지"
                  className="absolute object-cover"
                />
              </div>
              <div className="flex gap-4">
                <Link
                  to={`${displayUser?.userId}/follower`}
                  className=" text-center hover:backdrop-brightness-75 rounded-md p-2"
                >
                  <div className="font-bold">
                    {displayUser?.followCount || "0"}
                  </div>
                  <div>팔로잉</div>
                </Link>
                <button className="hover:backdrop-brightness-75 rounded-md p-2">
                  <div className="font-bold">
                    {displayUser?.followerCount || "0"}
                  </div>
                  <div>팔로워</div>
                </button>
              </div>
            </div>
            <div>{displayUser?.intro}</div>
            <div className="text-gray-400">
              가입일:
              {user ? format(user.signupDay, "yyyy-MM-dd") : "2024년 6월"}
            </div>
          </div>
        );
      }}
    </UserInfo>
  );
};

export default UserInfoUi;
