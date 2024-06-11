import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";

const UserInfo = ({ children, userInfo }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    if (userId && userInfo?.userId) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:7090/api/public/user/${userId}?followCheckUserId=${userInfo.userId}`
          );
          if (response.status === 200) {
            console.log(response.data);
            setUser(response.data);
          }
        } catch (error) {
          console.log("존재하지 않는 회원 입니다.");
        }
      };

      fetchUserData();
    }
  }, [userId, userInfo]);

  return <>{children({ user })}</>;
};

export default UserInfo;
