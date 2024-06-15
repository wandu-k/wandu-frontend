// UserInfoUi 컴포넌트
import React, { useEffect, useLayoutEffect, useState } from "react";
import profile from "../../images/basic/profile.png";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";
import FollowButton from "../follow/FollowButton";

let content;

const UserInfoUi = ({ userInfo }) => {
  const [user, setUser] = useState(null);
  const { userId: paramUserId } = useParams();

  const [userId, setUserId] = useState();

  useEffect(() => {
    setUserId(paramUserId);
    if (!paramUserId) {
      setUserId(userInfo?.userId);
    }
  }, [userInfo, paramUserId]);

  useEffect(() => {
    if (userId && userInfo) {
      axios
        .get(
          `/api/public/user/${userId}?followCheckUserId=${userInfo?.userId}`
        )
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            setUser(response.data);
          }
        })
        .catch((error) => {
          console.log("존재하지 않는 회원입니다.");
        });
    }
  }, [userInfo, userId]);

  useLayoutEffect(() => {
    content = <></>;
  });

  return (
    <>
      <div className="flex flex-col gap-2 ">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{user?.nickname}</h2>
          {user?.followerCheck == 1 && (
            <div className="text-sm bg-gray-200 text-gray-600 px-2 rounded-2xl">
              나를 팔로우 합니다
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="w-16 h-16 relative rounded-full overflow-hidden">
            <img
              src={user?.profileImage || profile}
              alt="이미지"
              className="absolute object-cover"
            />
          </div>
          {user && userInfo?.userId !== user?.userId && (
            <FollowButton setUser={setUser} user={user} />
          )}
          <div className="flex gap-4">
            <Link
              to={`/${user?.userId}/following`}
              className=" text-center hover:backdrop-brightness-75 rounded-md p-2"
            >
              <div className="font-bold">{user?.followCount || "0"}</div>
              <div>팔로잉</div>
            </Link>
            <Link
              to={`/${user?.userId}/followers`}
              className=" text-center hover:backdrop-brightness-75 rounded-md p-2"
            >
              <div className="font-bold">{user?.followerCount || "0"}</div>
              <div>팔로워</div>
            </Link>
          </div>
        </div>
        <div>{user?.intro}</div>
        <div className="text-gray-400">
          가입일: {user ? format(user.signupDay, "yyyy-MM-dd") : "2024년 6월"}
        </div>
      </div>
    </>
  );
};

export default UserInfoUi;
