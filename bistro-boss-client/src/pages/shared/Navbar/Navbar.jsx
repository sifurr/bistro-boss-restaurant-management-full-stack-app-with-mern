import { useContext } from 'react';
import { BiSolidUserCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../providers/AuthProvider';
import { FaShoppingCart } from 'react-icons/fa';
import useCart from '../../../hooks/useCart';



const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const [cart] = useCart()

    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err))
    }
    const navOptions =
        <>
            <li>
                <Link to="/" >Home</Link>
            </li>
            <li><Link to="/menu">Our Menu</Link></li>
            <li><Link to="/order/salad">Order Food</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li>
                <Link to="/">
                    <button className="btn">
                        <FaShoppingCart className='mr-2'/>
                        <div className="badge badge-secondary">+{cart.length}</div>
                    </button>
                </Link>
            </li>
            {
                user ?
                    <li><Link onClick={handleLogout} to="/">Logout</Link></li>
                    :
                    <li><Link to="/login">Login</Link></li>
            }
        </>




    return (
        <div className="navbar fixed opacity-60 text-white bg-black z-10 max-w-screen-xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navOptions}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">Bistro Boss</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>
            <div className="navbar-end">
                <a className="cursor-pointer"><span className='text-4xl'><img className="w-10 h-10 object-cover rounded-full" src={user?.photoURL} alt="" /> </span></a>
            </div>
        </div>
    );
};

export default Navbar;