import { useEffect, useState } from "react";
import avatarBody from "../../images/avatar/body.png";
import axios from "axios";

const AvatarUi = ({ userId }) => {
  const [avatar, setAvatar] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:7090/api/user/avatar/${userId}`, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        console.log(response.data);
        setAvatar(response.data);
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      <div className="w-full h-full">
        <div className="p-4 w-full h-full">
          <div className="relative w-full h-full">
            <img
              src={avatarBody}
              className=" absolute inset-0 w-full h-full object-contain"
            />
            <img
              src={avatar?.head}
              className=" absolute inset-0 w-full h-full object-contain z-10"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AvatarUi;
