import HomePage from "../pages/HomeTemplates/HomePage";
import AboutPage from "../pages/HomeTemplates/AboutPage";
import React from "react";
import { Route } from "react-router-dom";
import HomeTemplates from "../pages/HomeTemplates";
import AdminPage from "../pages/AdminTemplates";
import DashBoardPage from "../pages/AdminTemplates/Dashboard";
import AddUserPage from "../pages/AdminTemplates/AddUserPage";
import AuthPage from "../pages/AdminTemplates/AuthPage";
import PageNotFound from "../pages/PageNotFound";


type TRoute = {
  path: string;
  element: React.ReactNode;
  children?: TRoute[];
};

export const routes: TRoute[] = [
  {
    path: "",
    element: <HomeTemplates />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
    ],
  },
  {
    path: "admin",
    element: <AdminPage />,
    children: [
      {
        path: "dashboard",
        element: <DashBoardPage />
      },
      {
        path: "add-user",
        element: <AddUserPage />
      },
    ]
  },
  {
    path: "auth",
    element: <AuthPage />
  },
  {
    path: "*",
    element: <PageNotFound />
  }
];

export const renderRoutes = (routes: TRoute[]) => {
  return routes.map((route) => {
    if (route.children) {
      return (
        <Route key={route.path} path={route.path} element={route.element}>
          {route.children.map((child) => (
            <Route key={child.path} path={child.path} element={child.element} />
          ))}
        </Route>
      );
    }
    return <Route key={route.path} path={route.path} element={route.element} />;
  });
};


