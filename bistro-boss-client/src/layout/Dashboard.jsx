import { FaAd, FaCalendar, FaHome, FaList, FaListAlt, FaShoppingCart, FaUser } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";



const Dashboard = () => {
    const [cart] = useCart()
    return (
        <div className="flex">
            <div className="w-64 bg-orange-400 min-h-screen">
                <ul className="menu p-4">                    
                    <li>
                        <NavLink to={'/dashboard/user-home'}>
                            <FaHome></FaHome>
                            User Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/reservation'}>
                            <FaCalendar></FaCalendar>
                            Reservation
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/cart'}>
                            <FaShoppingCart></FaShoppingCart>
                            Cart ({cart.length})
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/bookings'}>
                            <FaList></FaList>
                            Bookings
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/review'}>
                           <FaAd></FaAd>
                            Review
                        </NavLink>
                    </li>
                    <div className="divider"></div>
                    <li>
                        <NavLink to={'/'}>
                            <FaHome></FaHome>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/order/salad'}>
                            <FaListAlt></FaListAlt>
                            Menu
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;