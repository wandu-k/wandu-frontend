import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";

const UserInfo = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:7090/api/public/user?userId=${userId}`
        );
        if (response.status === 200) {
          console.log(response.data);
          setUser(response.data);
        } else {
          setError("Failed to fetch user data");
        }
      } catch (error) {
        setError("An error occurred while fetching user data");
        console.log(error);
      }
    };

    fetchUserData();
  }, [userId]);

  return <>{children({ user })}</>;
};

export default UserInfo;
