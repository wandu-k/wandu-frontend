import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import profile from "../images/basic/profile.png";
import FollowButton from "../components/follow/FollowButton";
import FollowUserList from "../components/follow/FollowUserList";

const FollowersPage = () => {
  const { userId } = useParams();
  const [followerList, setFollowerList] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:7090/api/user/${userId}/follow/follower`, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setFollowerList(response.data);
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      <div className=" mt-20 xl:pl-96  flex w-full flex-col">
        {followerList?.map((follower, index) => (
          <FollowUserList user={follower} index={index} />
        ))}
      </div>
    </>
  );
};

export default FollowersPage;
