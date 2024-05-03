import React from "react";
import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/LoginPage";
library.add(fas);

const Loading = <div>Loading...</div>;
const Main = lazy(() => import("../pages/MainPage"));

const root = createBrowserRouter([
  {
    path: "minihome",
    element: (
      <Suspense fallback={Loading}>
        <MainLayout></MainLayout>
      </Suspense>
    ),
    children: [
      {
        path: ":hpID",
        element: <Main></Main>,
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage></LoginPage>,
  },
]);

export default root;
