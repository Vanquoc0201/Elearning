import HomePage from "../pages/HomeTemplates/HomePage";
import AboutPage from "../pages/HomeTemplates/AboutPage";
import React from "react";
import { Route } from "react-router-dom";
import HomeTemplates from "../pages/HomeTemplates";

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


