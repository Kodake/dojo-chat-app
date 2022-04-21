// Styles & Images
import './Navbar.css';
import Temple from '../assets/temple.svg';
import { NavLink } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

const Navbar = () => {
    const { logout, isPending } = useLogout();

    return (
        <div className='navbar'>
            <ul>
                <li className='logo'>
                    <img src={Temple} alt='dojo logo' />
                    <span>The Dojo Chat</span>
                </li>

                <li><NavLink to='/login'>Login</NavLink></li>
                <li><NavLink to='/signup'>Signup</NavLink></li>

                <li>
                    {!isPending && <button className="btn" onClick={logout}>Logout</button>}
                    {isPending && <p>Logging out...</p>}
                </li>
            </ul>
        </div>
    )
}

export default Navbar;