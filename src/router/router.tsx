import { createBrowserRouter } from "react-router-dom";

import Home from "../components/Home";
import Debts from "../components/Debts";
import ProfileMenu from "../User/user";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/profile",
    element: <ProfileMenu />,
  },

  {
    path: "/debts",
    element: <Debts />,
  },
]);