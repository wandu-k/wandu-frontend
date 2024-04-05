import { MiniHomeContext } from "../contexts/MiniHomeContext";
import React, { useContext } from "react";

const MainPage = () => {
  const miniHomeInfo = useContext(MiniHomeContext); // 컨텍스트 값을 가져옴

  const renderMiniHomeInfo = () => {
    const elements = [];
    for (let key in miniHomeInfo) {
      // 각 속성과 해당 값을 <div>에 추가
      elements.push(
        <div key={key}>
          <strong>{key}:</strong> {miniHomeInfo[key]}
        </div>
      );
    }
    return elements;
  };

  console.log(miniHomeInfo);
  return (
    <div>
      <div>Main Page</div>
      <div>{renderMiniHomeInfo()}</div>
    </div>
  );
};

export default MainPage;
