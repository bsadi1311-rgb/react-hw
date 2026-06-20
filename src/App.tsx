import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import { Suspense } from "react";

import Layout from "./components/Layout";

import {
  Login,
  Register,
  Home,
  Debts,
  ProfileMenu,
  NotFound
} from "./router/router";

import "./App.css";


function App() {


  const router = createBrowserRouter([

    {
      path: "/",
      element: <Layout />,

      children: [

        {
          index: true,
          element: <Login />
        },


        {
          path: "login",
          element: <Login />
        },


        {
          path: "register",
          element: <Register />
        },


        {
          path: "home",
          element: <Home />
        },


        {
          path: "debts",
          element: <Debts />
        },


        {
          path: "profile",
          element: <ProfileMenu />
        },


        {
          path: "*",
          element: <NotFound />
        }

      ]

    }

  ]);


  return (

    <Suspense fallback={<div>Loading...</div>}>

      <RouterProvider router={router}/>

    </Suspense>

  );

}


export default App;