//#region Импортирование
// Импортирование React
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Импортирование React страниц
import HomePage from "./pages/HomePage";
import ProfilesPage from "./pages/ProfilesPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignInUpPage from "./pages/SignPage";

// Импортирование стилей
import "./style.scss";
//#endregion

// Структура нескольких страниц
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/profile",
    element: <ProfilesPage />,
  },
  {
    path: "/sign-in",
    element: <SignInUpPage />,
  },
]);

// Импортирование React-компонентов в блок root
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
