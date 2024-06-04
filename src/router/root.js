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
import PictureLayout from "../layouts/PictureLayout";
import PicturePage from "../pages/PicturePage";
import { ShopCategoryProvider } from "../contexts/ShopCategoryContext";
import ShopSubPage from "../pages/ShopSubPage";
import ChargePage from "../pages/ChargePage";
import ProfileLayout from "../layouts/ProfileLayout";
import ItemPage from "../pages/ItemPage";
import InventoryPage from "../pages/my/InventoryPage";
import MyPage from "../pages/my/MyPage";
import MyLayout from "../layouts/MyLayout";

library.add(fas);

const Loading = <div>Loading...</div>;
const Main = lazy(() => import("../pages/MainPage"));

const root = createBrowserRouter([
  {
    path: "",
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
        element: (
          <Suspense fallback={Loading}>
            <ProfileLayout />
          </Suspense>
        ),
        children: [
          {
            path: "minihome",
            element: (
              <Suspense fallback={Loading}>
                <Main />
              </Suspense>
            ),
          },
          {
            path: "picture",
            element: (
              <Suspense fallback={Loading}>
                <PictureLayout />
              </Suspense>
            ),
            children: [
              {
                path: "",
                element: (
                  <Suspense fallback={Loading}>
                    <PicturePage />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "diary",
            element: (
              <Suspense fallback={Loading}>
                <DiaryLayout />
              </Suspense>
            ),
            children: [
              {
                path: "",
                element: (
                  <Suspense fallback={Loading}>
                    <DiaryPage />
                  </Suspense>
                ),
              },
              {
                path: "write",
                element: (
                  <Suspense fallback={Loading}>
                    <PostWritePage />
                  </Suspense>
                ),
              },
              {
                path: ":postId",
                element: (
                  <Suspense fallback={Loading}>
                    <PostPage />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
      {
        path: "shop",
        element: (
          <ShopCategoryProvider>
            <Suspense fallback={Loading}>
              <ShopLayout />
            </Suspense>
          </ShopCategoryProvider>
        ),
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={Loading}>
                <ShopPage />
              </Suspense>
            ),
          },
          {
            path: "item",
            element: (
              <Suspense fallback={Loading}>
                <ShopSubPage />
              </Suspense>
            ),
          },
          {
            path: "item/:itemId",
            element: (
              <Suspense fallback={Loading}>
                <ItemPage />
              </Suspense>
            ),
          },
          {
            path: "add",
            element: (
              <Suspense fallback={Loading}>
                <ItemAddPage />
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
  {
    path: "charge",
    element: (
      <LoginProvider>
        <ChargePage />
      </LoginProvider>
    ),
  },
  {
    path: "my",
    element: (
      <LoginProvider>
        <Suspense fallback={Loading}>
          <MyLayout></MyLayout>
        </Suspense>
      </LoginProvider>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={Loading}>
            <MyPage></MyPage>
          </Suspense>
        ),
      },
      {
        path: "inventory",
        element: (
          <Suspense fallback={Loading}>
            <InventoryPage></InventoryPage>
          </Suspense>
        ),
      },
    ],
  },
]);

export default root;
