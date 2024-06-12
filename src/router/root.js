import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { LoginProvider } from "../contexts/LoginContext";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/LoginPage";
import LogoutPage from "../pages/LogoutPage";
import DiaryPage from "../pages/minihome/DiaryPage";
import PostWritePage from "../pages/PostWritePage";
import DiaryLayout from "../layouts/DiaryLayout";
import PostPage from "../pages/PostPage";
import ShopLayout from "../layouts/ShopLayout";
import ShopPage from "../pages/ShopPage";
import ItemAddPage from "../pages/ItemAddPage";
import { ShopCategoryProvider } from "../contexts/ShopCategoryContext";
import ShopSubPage from "../pages/ShopSubPage";
import ChargePage from "../pages/ChargePage";
import ProfileLayout from "../layouts/ProfileLayout";
import ItemPage from "../pages/ItemPage";
import InventoryPage from "../pages/my/InventoryPage";
import MyLayout from "../layouts/MyLayout";
import MyInfoPage from "../pages/my/MyInfoPage";
import AccountPage from "../pages/my/AccountPage";
import { MiniHomeProvider } from "../contexts/MiniHomeContext";
import FollowingPage from "../pages/FollowingPage";
import FollowersPage from "../pages/FollowersPage";
import { BgmProvider } from "../contexts/BgmContext";
import AlbumLayout from "../layouts/AlbumLayout";
import AlbumPage from "../pages/minihome/AlbumPage";
import AlbumAddPage from "../pages/minihome/AlbumAddPage";

library.add(fas);

const Loading = <div>Loading...</div>;
const Main = lazy(() => import("../pages/MainPage"));

const root = createBrowserRouter([
  {
    path: "",
    element: (
      <LoginProvider>
        <MiniHomeProvider>
          <BgmProvider>
            <Suspense fallback={Loading}>
              <MainLayout />
            </Suspense>
          </BgmProvider>
        </MiniHomeProvider>
      </LoginProvider>
    ),
    children: [
      {
        path: ":userId",
        element: <ProfileLayout />,
        children: [
          {
            path: "following",
            element: <FollowingPage></FollowingPage>,
          },
          {
            path: "followers",
            element: <FollowersPage />,
          },
          {
            path: "minihome",
            element: <Main />,
          },
          {
            path: "album",
            element: <AlbumLayout />,
            children: [
              {
                path: "",
                element: <AlbumPage />,
              },
              {
                path: "add",
                element: <AlbumAddPage />,
              },
            ],
          },
          {
            path: "diary",
            element: <DiaryLayout />,
            children: [
              {
                path: "",
                element: <DiaryPage />,
              },
              {
                path: "write",
                element: <PostWritePage />,
              },
              {
                path: ":postId",
                element: <PostPage />,
              },
            ],
          },
        ],
      },
      {
        path: "shop",
        element: (
          <ShopCategoryProvider>
            <ShopLayout />
          </ShopCategoryProvider>
        ),
        children: [
          {
            path: "",
            element: <ShopPage />,
          },
          {
            path: "item",
            element: <ShopSubPage />,
          },
          {
            path: "item/:itemId",
            element: <ItemPage />,
          },
          {
            path: "add",
            element: <ItemAddPage />,
          },
        ],
      },
      {
        path: "my",
        element: <MyLayout></MyLayout>,
        children: [
          {
            path: "",
            element: <MyInfoPage></MyInfoPage>,
          },
          {
            path: "account",
            element: <AccountPage></AccountPage>,
          },
          {
            path: "inventory",
            element: <InventoryPage></InventoryPage>,
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
]);

export default root;
