// Styles & Images
import './Navbar.css';
import Temple from '../assets/temple.svg';
import { NavLink } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
    const { logout, isPending } = useLogout();
    const { user } = useAuthContext();

    return (
        <div className='navbar'>
            <ul>
                <li className='logo'>
                    <img src={Temple} alt='dojo logo' />
                    <span>The Dojo Chat</span>
                </li>

                {!user && (
                    <>
                        <li><NavLink to='/login'>Login</NavLink></li>
                        <li><NavLink to='/signup'>Signup</NavLink></li>
                    </>
                )}

                {user && (
                    <li>
                        {!isPending && <button className="btn" onClick={logout}>Logout</button>}
                        {isPending && <p>Logging out...</p>}
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Navbar;