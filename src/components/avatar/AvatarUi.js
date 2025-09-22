import axios from "axios";
import { useEffect, useState } from "react";
import defaultEye from "../../images/avatar/bigeye.png";
import avatarBody from "../../images/avatar/body.png";

const AvatarUi = ({ userId }) => {
  const [avatar, setAvatar] = useState();
  useEffect(() => {
    axios
      .get(`https://wookportfolio.duckdns.org:81/api/user/${userId}/avatar`, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        console.log(response.data);
        setAvatar(response.data);
      })
      .catch((error) => {});
  }, [userId]);

  return (
    <>
      <div className="w-full h-full">
        <div className="p-4 w-full h-full">
          <div className="relative w-full h-full">
            <img
              src={avatarBody}
              className=" absolute inset-0 w-full h-full object-contain -z-30"
            />
            <img
              src={avatar?.eye || defaultEye}
              className=" absolute inset-0 w-full h-full object-contain z-0"
            />
            {avatar?.head && (
              <img
                src={avatar?.head}
                className=" absolute inset-0 w-full h-full object-contain z-10"
              />
            )}
            {avatar?.cloth && (
              <img
                src={avatar?.cloth}
                className=" absolute inset-0 w-full h-full object-contain z-20"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AvatarUi;
