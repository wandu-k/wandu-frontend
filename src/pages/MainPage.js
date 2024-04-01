const MainPage = () => {
  useEffect(() => {
    fetch("http://localhost:8080/movie", {
      method: "GET",
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(`HTTP error! status: ${resp.status}`);
        }
        return resp.json();
      })
      .then((data) => {
        console.log("요청 성공:", data);
        setMovieData(data); // 데이터를 상태에 저장
      })
      .catch((error) => {
        console.error("요청 실패:", error);
      });
  }, []);
  return (
    <div>
      <div>Main Page</div>
    </div>
  );
};

export default MainPage;
