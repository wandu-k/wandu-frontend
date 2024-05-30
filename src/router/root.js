import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { LoginProvider } from "../contexts/LoginContext";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/LoginPage";
import LogoutPage from "../pages/LogoutPage";
import ProfilePage from "../pages/ProfilePage";
import DiaryPage from "../pages/minihome/DiaryPage";
import PostWritePage from "../pages/PostWritePage";
import DiaryLayout from "../layouts/DiaryLayout";
import PostPage from "../pages/PostPage";
import ShopLayout from "../layouts/ShopLayout";
import ShopPage from "../pages/ShopPage";
import ItemAddPage from "../pages/ItemAddPage";

library.add(fas);

const Loading = <div>Loading...</div>;
const Main = lazy(() => import("../pages/MainPage"));

const root = createBrowserRouter([
  {
    path: "/",
    element: (
      <LoginProvider>
        <Suspense fallback={Loading}>
          <MainLayout />
        </Suspense>
      </LoginProvider>
    ),
    children: [
      {
        path: ":userId",
      },
      {
        path: ":userId/minihome",
        element: (
          <Suspense fallback={Loading}>
            <Main />
          </Suspense>
        ),
      },
      {
        path: ":userId/picture",
        element: <Suspense fallback={Loading}></Suspense>,
      },
      {
        path: ":userId/diary",
        element: (
          <Suspense fallback={Loading}>
            <DiaryLayout></DiaryLayout>
          </Suspense>
        ),
        children: [
          {
            path: "",
            element: <DiaryPage />,
          },
          {
            path: "write",
            element: (
              <Suspense fallback={Loading}>
                <PostWritePage></PostWritePage>
              </Suspense>
            ),
          },
          {
            path: ":postId",
            element: (
              <Suspense fallback={Loading}>
                <PostPage></PostPage>
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "shop",
        element: (
          <Suspense fallback={Loading}>
            <ShopLayout></ShopLayout>
          </Suspense>
        ),
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={Loading}>
                <ShopPage></ShopPage>
              </Suspense>
            ),
          },
          {
            path: ":categoryId",
            element: (
              <Suspense fallback={Loading}>
                <ShopPage></ShopPage>
              </Suspense>
            ),
          },
          {
            path: "add",
            element: (
              <Suspense fallback={Loading}>
                <ItemAddPage></ItemAddPage>
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: (
      <LoginProvider>
        <LoginPage />
      </LoginProvider>
    ),
  },
  {
    path: "logout",
    element: (
      <LoginProvider>
        <LogoutPage />
      </LoginProvider>
    ),
  },
]);

export default root;
