import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user }) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            Unplanned Place
            <i className='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/services'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Blog
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/products'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Shop
              </Link>
            </li>

            {!user ? (
              <li>
                <Link
                  to='/sign-up'
                  className='nav-links-mobile'
                  onClick={closeMobileMenu}>
                  Sign Up
                </Link>
              </li>
            ) : null}
          </ul>
          {button && !user && <Button to='/sign-up' buttonStyle='btn--outline'>SIGN UP</Button>}
          {!user ? (
            <li>
              <Link
                to='/login'
                className='nav-links-mobile'
                onClick={closeMobileMenu}>
                Login
              </Link>
            </li>
          ) : (
            <li>
              <Link
                to='/logout'
                className='nav-links-mobile'
                onClick={closeMobileMenu}>
                Logout
              </Link>
            </li>
          )}
          {button && !user && <Button to="/login" buttonStyle='btn--outline'>Login</Button>}
          {button && !!user && <Button to="/logout" buttonStyle='btn--outline'>Logout</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;