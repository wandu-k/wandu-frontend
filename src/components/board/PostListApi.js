import { useEffect, useRef, useState } from "react";
import axios from "axios";

const PostListApi = ({ size, children }) => {
  const [numOfPosts, setNumOfPosts] = useState(5); // 기본적으로 보여줄 게시글 수
  const containerRef = useRef(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:7090/api/minihome/post", {
        boardID: 1,
        page: 1,
        size: 5,
      })
      .then((response) => {
        if (response.status === 200) {
          setPosts(response.data.dtoList);
          console.log(response.data.dtoList);
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <>{children(posts)}</>;
};

export default PostListApi;
