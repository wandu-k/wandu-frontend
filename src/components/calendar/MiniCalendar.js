const MiniCalender = () => {
  useEffect(() => {
    if (location.pathname.includes(`/diary`)) {
      axios
        .get("https://wookportfolio.duckdns.org:8082/api/user/daily", {
          headers: { Authorization: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {});
    }
  }, []);

  return (
    <>
      {/* Displaying the current year and month */}
      <div>
        <div className="text-xl font-bold">
          {currentYear}년 {currentMonth}월
        </div>
        <div className="flex justify-between gap-2 font-bold h-16 items-center">
          <button onClick={decrementRange}>
            <FontAwesomeIcon icon="fa-solid fa-caret-left" />
          </button>
          {days}
          <button onClick={incrementRange}>
            <FontAwesomeIcon icon="fa-solid fa-caret-right" />
          </button>
        </div>
      </div>
      {userInfo?.userId == userId ? (
        <>
          {" "}
          <button
            className=" h-12 text-white font-bold w-full bg-lime-500 rounded-md"
            onClick={dailyCheck}
          >
            출석체크
          </button>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default MiniCalender;
