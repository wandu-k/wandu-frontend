import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const FollowButton = ({ user, setUser }) => {
  const handleFollowButton = (userId) => {
    axios
      .post(
        `https://wookportfolio.duckdns.org:81/api/my/follow/${userId}`,
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
      .delete(`https://wookportfolio.duckdns.org:81/api/my/follow/${userId}`, {
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
      {" "}
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
  );
};

export default FollowButton;
