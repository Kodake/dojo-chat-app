// Styles & Images
import './Navbar.css';
import Temple from '../assets/temple.svg';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
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
                    <button className="btn">Logout</button>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;