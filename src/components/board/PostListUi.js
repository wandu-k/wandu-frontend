import PostListApi from "./PostListApi";
import { useEffect, useState, useRef } from "react";

const PostListUi = () => {
  const [size, setSize] = useState(null); // 컴포넌트 크기를 저장할 상태
  const containerRef = useRef(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        // 컨테이너의 크기를 상태에 설정
        setSize({ width, height });
      }
    });

    // 컴포넌트가 마운트될 때 ResizeObserver를 컨테이너에 연결
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // 컴포넌트가 언마운트될 때 ResizeObserver 해제
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full border border-slate-100 shadow-light z-auto backdrop-blur-md bg-white/75 rounded-2xl p-6 flex flex-col justify-between"
    >
      <PostListApi size={size}>
        {(posts) => (
          <>
            {posts.map((post) => (
              <div key={post.postID} className="flex justify-between">
                <a>{post.title}</a>
                <div>{post.writeDay}</div>
              </div>
            ))}
          </>
        )}
      </PostListApi>
    </div>
  );
};

export default PostListUi;
