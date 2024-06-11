import React, { useEffect } from "react";
import UserInfo from "./UserInfo";
import profile from "../../images/basic/profile.png";
import { Link, NavLink, useParams } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";

const UserInfoUi = ({ userInfo }) => {
  const handleFollowButton = (userId) => {
    axios
      .post(
        `http://localhost:7090/api/my/follow/${userId}`,
        {},
        {
          headers: { Authorization: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {});
  };
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
              {displayUser?.userId != userInfo?.userId && (
                <button
                  type="button"
                  onClick={() => handleFollowButton(displayUser?.userId)}
                  className="rounded-full border h-10 w-20 dark:bg-white dark:text-black"
                >
                  팔로우
                </button>
              )}
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
