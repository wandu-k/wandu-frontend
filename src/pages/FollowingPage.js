import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import profile from "../images/basic/profile.png";
import FollowButton from "../components/follow/FollowButton";
import FollowUserList from "../components/follow/FollowUserList";

const FollowingPage = () => {
  const { userId } = useParams();
  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/user/${userId}/follow/following`, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setFollowingList(response.data);
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      <div className=" mt-20 xl:pl-96  flex w-full flex-col">
        {followingList?.map((following, index) => (
          <FollowUserList user={following} index={index} />
        ))}
      </div>
    </>
  );
};

export default FollowingPage;
