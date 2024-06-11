// UserInfoUi 컴포넌트
import React, { useEffect, useState } from "react";
import profile from "../../images/basic/profile.png";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const UserInfoUi = ({ userInfo }) => {
  const [user, setUser] = useState();
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
          `http://localhost:7090/api/public/user/${userId}?followCheckUserId=${userInfo?.userId}`
        )
        .then((response) => {
          if (response.status === 200) {
            setUser(response.data);
          }
        })
        .catch((error) => {
          console.log("존재하지 않는 회원입니다.");
        });
    }
  }, [userInfo, userId]);

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
        setUser((prevUser) => ({
          ...user,
          followCheck: 1,
          followerCount: prevUser.followerCount + 1,
        }));
        Notify.success(response.data);
      })
      .catch((error) => {});
  };

  const handleUnFollowButton = (userId) => {
    axios
      .delete(`http://localhost:7090/api/my/follow/${userId}`, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        console.log(response);
        setUser((prevUser) => ({
          ...user,
          followCheck: 0,
          followerCount: prevUser.followerCount - 1,
        }));
        Notify.success(response.data);
      })
      .catch((error) => {});
  };

  return (
    <>
      <div className="flex flex-col gap-2 ">
        <h2 className="text-xl font-semibold">{user?.nickname}</h2>
        <div className="flex justify-between items-center">
          <div className="w-16 h-16 relative rounded-full overflow-hidden">
            <img
              src={user?.profileImage || profile}
              alt="이미지"
              className="absolute object-cover"
            />
          </div>
          {user?.userId !== userInfo?.userId && (
            <>
              {user?.followCheck !== 0 ? (
                <button
                  type="button"
                  onClick={() => handleUnFollowButton(user.userId)}
                  className="rounded-full border h-10 w-20 dark:bg-white dark:text-black"
                >
                  언팔로우
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleFollowButton(user.userId)}
                  className="rounded-full border h-10 w-20 dark:bg-white dark:text-black"
                >
                  팔로우
                </button>
              )}
            </>
          )}
          <div className="flex gap-4">
            <Link
              to={`${user?.userId}/follower`}
              className=" text-center hover:backdrop-brightness-75 rounded-md p-2"
            >
              <div className="font-bold">{user?.followCount || "0"}</div>
              <div>팔로잉</div>
            </Link>
            <button className="hover:backdrop-brightness-75 rounded-md p-2">
              <div className="font-bold">{user?.followerCount || "0"}</div>
              <div>팔로워</div>
            </button>
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
