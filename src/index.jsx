import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import store from "./store";
import App from "./App";
import Signup from "./features/User/Signup";
import Login from "./features/User/Login";
import Profile from "./features/User/Profile";
import Explore from "./features/Posts/Explore";
import Bookmark from "./features/User/Bookmark";
import Home from "./features/User/Home";
import PostDetails from "./features/Posts/PostDetails";
import ThirdPersonProfile from "./features/ThirdPersonProfile/ThirdPersonProfile";
import SetNewPassword from "./features/User/SetNewPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/explore",
    element: <Explore />,
  },
  {
    path: "/bookmark",
    element: <Bookmark />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/post/:postId",
    element: <PostDetails />,
  },
  {
    path: "/profile/:profileId",
    element: <ThirdPersonProfile />,
  },
  {
    path: "/setNewPassword",
    element: <SetNewPassword />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
