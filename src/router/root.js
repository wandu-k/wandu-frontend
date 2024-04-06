import React from "react";
import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Loading = <div>Loading...</div>;
const Main = lazy(() => import("../pages/MainPage"));

const root = createBrowserRouter([
  {
    path: "minihome/:userID",
    element: (
      <Suspense fallback={Loading}>
        <Main />
      </Suspense>
    ),
  },
]);

export default root;
