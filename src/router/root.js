import React from "react";
import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { MiniHomeProvider } from "../contexts/MiniHomeContext";

const Loading = <div>Loading...</div>;
const Main = lazy(() => import("../pages/MainPage"));

const root = createBrowserRouter([
  {
    path: "minihome/:userID",
    element: (
      <Suspense fallback={Loading}>
        <MiniHomeProvider>
          <Main />
        </MiniHomeProvider>
      </Suspense>
    ),
  },
]);

export default root;
