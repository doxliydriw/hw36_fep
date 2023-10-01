import React from 'react';
import { NavLink } from 'react-router-dom';
 
function Nav() {
    return (
        <>
            <nav className='navBox'>
                <ul className='navList'>
                    <li><NavLink to='/'>home</NavLink></li>
                    <li><NavLink to='/list'>list of enrtie</NavLink></li>
                    <li><NavLink to='/form'>add new entry form</NavLink></li>
                </ul>
            </nav>
        </>
   );
};

export default Nav