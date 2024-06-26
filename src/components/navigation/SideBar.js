import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "animate.css";
import { addDays, format, getMonth, getYear, subDays } from "date-fns"; // Importing date formatting function
import axios from "axios"; // Importing axios for HTTP requests
import UserInfoUi from "../userInfo/UserInfoUi";
import AvatarUi from "../avatar/AvatarUi";
import Chat from "../miniHome/Chat";

const SideBar = ({ userInfo }) => {
  const location = useLocation();
  const { userId } = useParams();
  const [startDay, setStartDay] = useState(subDays(new Date(), 2));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentYear, setCurrentYear] = useState(getYear(new Date())); // Adding state for the current year
  const [currentMonth, setCurrentMonth] = useState(getMonth(new Date()) + 1); // Adding state for the current month
  const [diaryList, setDiaryList] = useState(null);
  const days = [];

  const updateMonthAndYear = (date) => {
    setCurrentMonth(getMonth(date) + 1);
    setCurrentYear(getYear(date));
  };

  const incrementRange = () => {
    const newStartDay = addDays(startDay, 5);
    setStartDay(newStartDay);
    updateMonthAndYear(newStartDay);
  };

  const decrementRange = () => {
    const newStartDay = subDays(startDay, 5);
    setStartDay(newStartDay);
    updateMonthAndYear(newStartDay);
  };

  for (let i = 0; i < 5; i++) {
    const currentDay = addDays(startDay, i);
    const dayNumber = format(currentDay, "dd");
    days.push(
      <button
        key={dayNumber}
        onClick={() => handleDateChange(currentDay)}
        className={
          format(currentDay, "yyyy-MM-dd") ===
          format(selectedDate, "yyyy-MM-dd")
            ? "w-12 h-12 text-white font-bold text-xl bg-lime-500 rounded-full"
            : "w-12 h-12 rounded-full"
        }
      >
        {dayNumber}
      </button>,
    );
  }

  const dailyCheck = () => {
    axios.post(
      "/api/user/daily",
      {
        userId: userId,
        date: new Date(),
      },
      {
        headers: { Authorization: localStorage.getItem("accessToken") },
      },
    );
  };

  useEffect(() => {
    // if (location.pathname.includes(`/diary`)) {
    //   handleDateChange(selectedDate);
    // }
  }, [location.pathname, selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = format(date, "yyyy-MM-dd"); // Formatting the date

    axios
      .post(
        "/api/user/diary",
        {
          date: formattedDate,
          userId: userId,
        },
        {
          headers: { Authorization: localStorage.getItem("accessToken") },
        },
      )
      .then((response) => {
        setDiaryList(
          response.data.map((diary) => ({
            ...diary,
            content: diary.content.replace(/<[^>]+>/g, ""), // Removing HTML tags
          })),
        );
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  let content;
  if (location.pathname.includes(`/shop`)) {
    content = (
      <div className="flex gap-12 text-2xl font-bold tracking-tighter">
        <Link
          to={"/shop/add"}
          className="bg-lime-500 text-white rounded-md p-2"
        >
          아이템 업로드
        </Link>
      </div>
    );
  } else if (location.pathname.includes(`/diary`)) {
    content = (
      <>
        <div className="flex flex-col border p-4 rounded-2xl dark:bg-zinc-950 dark:border-none">
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
        </div>
        <div className="flex flex-col border p-4 rounded-2xl min-h-72 h-96">
          <AvatarUi userId={userId}></AvatarUi>
        </div>
      </>
    );
  } else if (location.pathname.includes(`/minihome`)) {
    content = (
      <>
        <div className="flex flex-col gap-4 h-full">
          <Chat></Chat>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-4 h-full p-4 overflow-y-auto ">
      <div className="w-full sm:border p-4 sm:rounded-2xl dark:bg-zinc-950 dark:border-none">
        <UserInfoUi userInfo={userInfo} />
      </div>
      {content}
    </div>
  );
};

export default SideBar;
