import React, { createContext, useEffect, useState } from "react";

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [updateTime, setUpdateTime] = useState(false);

  return (
    <MusicContext.Provider value={{ updateTime, setUpdateTime }}>
      {children}
    </MusicContext.Provider>
  );
};
