import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from '../pages/Home/Home/Home'
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Profile from "../pages/Profile/Profile";



export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path: "/",
            element: <Home></Home>
        },
        {
            path: "menu",
            element: <Menu></Menu>
        },
        {
            path: "order/:category",
            element: <Order></Order>
        },
        {
            path: "login",
            element: <Login></Login>
        },
        {
            path: "sign-up",
            element: <SignUp></SignUp>
        },
        {
            path: "profile",
            element: <PrivateRoute><Profile></Profile></PrivateRoute>
        }
      ]
    },
  ]);