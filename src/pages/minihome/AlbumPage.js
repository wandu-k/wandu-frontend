import { useContext, useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoginContext } from "../../contexts/LoginContext";

import axios from "axios";
import { format, formatDate } from "date-fns";

const AlbumPage = () => {
  const { userInfo } = useContext(LoginContext);
  const { userId } = useParams();
  const [albums, setAlbums] = useState([]);

  console.log("userInfo:", userInfo);
  console.log("userId:", userId);

  useEffect(() => {
    axios
      .post(
        `/api/user/${userId}/album/list`,
        {},
        {
          headers: { Authorization: localStorage.getItem("accessToken") }, // 헤더를 설정 객체 안에 포함
        }
      )
      .then((response) => {
        console.log(response.data);
        setAlbums(response.data);
      })
      .catch((error) => {
        console.error("Error fetching diaries:", error);
      });
  }, []);

  return (
    <>
      <div className="w-full mt-20 mb-16 relative p-4">
        <div className="grid w-full grid-cols-6  h-auto gap-4 ">
          {albums.map((album, index) => (
            <Link
              key={index}
              className=" min-w-36 aspect-square overflow-hidden border rounded-2xl relative"
            >
              <img
                src={album.file}
                className=" absolute inset-0 w-full h-full object-cover"
              />
            </Link>
          ))}
        </div>
      </div>
      {userId == userInfo?.userId && (
        <div className="top-0 h-dvh sticky pt-20 pb-16">
          <Link
            to="add"
            className="h-14 w-14 m-4 content-center text-center bottom-16 right-0 bg-blue-600 py-1 rounded-full text-white text-xl absolute"
          >
            <FontAwesomeIcon icon="fa-solid fa-plus" />
          </Link>
        </div>
      )}
    </>
  );
};

export default AlbumPage;
