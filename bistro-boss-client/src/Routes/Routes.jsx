import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from '../pages/Home/Home/Home'
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Profile from "../pages/Profile/Profile";
import Dashboard from "../layout/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
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
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                // normal user routes
                path: 'userHome',
                element: <UserHome></UserHome>
            },
            {
                
                path: 'cart',
                element: <Cart></Cart>
            },
            {               
                path: 'payment',
                element: <Payment></Payment>
            },
            {               
                path: 'paymentHistory',
                element: <PaymentHistory></PaymentHistory>
            },

            // admin only routes
            {
                path: 'adminHome',
                element: <AdminRoute> <AdminHome></AdminHome> </AdminRoute>
            },
            {
                path: 'add-items',
                element: <AdminRoute><AddItems></AddItems></AdminRoute>
            },
            {
                path: 'manage-items',
                element: <AdminRoute> <ManageItems></ManageItems> </AdminRoute>
            },
            {
                path: 'update-item/:id',
                element: <AdminRoute> <UpdateItem></UpdateItem> </AdminRoute>,
                // loader: ({params}) => fetch(`http://localhost:5000/menu/${params.id}`)
                loader: ({params}) => fetch(`https://bistro-boss-server-sandy-alpha.vercel.app/menu/${params.id}`)
            },
            {
                path: 'users',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            }
        ]
    }
]);