import React from "react";
import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { LoginProvider } from "../contexts/LoginContext";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/LoginPage";
import BoardPage from "../pages/minihome/BoardPage";
import PostWritePage from "../pages/minihome/PostWritePage";
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
        element: (
          <LoginProvider>
            <Main></Main>
          </LoginProvider>
        ),
      },
      {
        path: ":hpID/board",
        element: <BoardPage></BoardPage>,
      },
      {
        path: ":hpID/board/write",
        element: <PostWritePage></PostWritePage>,
      },
    ],
  },
  {
    path: "login",
    element: (
      <LoginProvider>
        <LoginPage></LoginPage>
      </LoginProvider>
    ),
  },
]);

export default root;
