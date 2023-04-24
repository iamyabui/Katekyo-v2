import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
// import App from './App';
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import Top from "./components/Teacher/Top";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TeacherDetail from "./components/Teacher/TeacherDetail";
import TeacherEditDetail from "./components/Teacher/TeacherEditDetail";

const container = document.getElementById("root")!;
const root = createRoot(container);
const router = createBrowserRouter([
  {
    path: "/",
    element: <Top />,
  },
  {
    path: "/Teacher/TeacherDetail",
    element: <TeacherDetail />,
  },
  {
    path: "/Teacher/TeacherEditDetail",
    element: <TeacherEditDetail />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Provider store={store}>{/* <App /> */}</Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();