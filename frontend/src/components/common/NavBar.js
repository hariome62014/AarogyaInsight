import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TiShoppingCart } from 'react-icons/ti';
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { GiHamburgerMenu } from 'react-icons/gi';

const NavBar = ({ setProgress }) => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef();

  // Determine the dashboard path based on user role
  const dashboardPath = token && user?.role === 'Core Member' 
    ? '/health-staff-dashboard' 
    : '/patient-dashboard';

  // Handle navbar visibility on scroll
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    setVisible(currentScrollPos <= prevScrollPos || currentScrollPos < 50);
    setPrevScrollPos(currentScrollPos);
  };

  // Add scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  // Close mobile nav when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMobileNavOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Function to determine active link
  const isActiveLink = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/patient-dashboard' || location.pathname === '/health-staff-dashboard';
    }
    return location.pathname === path;
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 bg-richblack-900 border-b border-gray-700 transition-transform ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="flex justify-between items-center w-11/12 max-w-screen-xl mx-auto h-14 px-4">
        {/* Logo */}
        <Link to="/" onClick={() => setProgress(100)} className="text-white text-xl font-bold">
          Aarogya Insight
        </Link>

        {/* Desktop Navbar */}
        <nav className="hidden md:flex items-center gap-6">
          <ul
            className={`flex gap-6 text-richblack-25 font-medium ${
              !token ? 'justify-center w-full' : ''
            }`}
          >
            {['Home', 'About', 'Contact'].map((link, index) => (
              <li key={index}>
                <Link
                  to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                  className={`relative hover:text-white transition ${
                    isActiveLink(link === 'Home' ? '/' : `/${link.toLowerCase()}`)
                      ? 'text-white'
                      : 'text-richblack-25'
                  }`}
                >
                  {link}
                  {isActiveLink(link === 'Home' ? '/' : `/${link.toLowerCase()}`) && (
                    <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-yellow-400 rounded transition-all duration-300"></span>
                  )}
                </Link>
              </li>
            ))}

            {/* Dashboard Link (only visible when logged in) */}
            {token && (
              <li>
                <Link
                  to={dashboardPath}
                  onClick={() => setProgress(100)}
                  className={`relative hover:text-white transition ${
                    isActiveLink('/dashboard') ? 'text-white' : 'text-richblack-25'
                  }`}
                >
                  Dashboard
                  {isActiveLink('/dashboard') && (
                    <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-yellow-400 rounded transition-all duration-300"></span>
                  )}
                </Link>
              </li>
            )}
          </ul>

          {token ? (
            <ProfileDropDown />
          ) : (
            <div className="flex gap-4">
              <Link
                to="/login"
                onClick={() => setProgress(100)}
                className="px-4 py-2 bg-yellow-50 text-black rounded-md hover:scale-95 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setProgress(100)}
                className="px-4 py-2 bg-yellow-50 text-black rounded-md hover:scale-95 transition"
              >
                Signup
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Navbar */}
        <div className="md:hidden flex items-center">
          <GiHamburgerMenu
            className="text-white text-2xl ml-4 cursor-pointer"
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          />
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <div
        ref={navRef}
        className={`absolute top-14 left-0 w-full bg-richblack-900 z-40 transition-all duration-300 md:hidden ${
          isMobileNavOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'
        }`}
      >
        <nav className="flex flex-col items-center gap-6 py-4">
          {['Home', 'About', 'Contact'].map((link, index) => (
            <Link
              key={index}
              to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
              onClick={() => setIsMobileNavOpen(false)}
              className={`relative hover:text-white transition ${
                isActiveLink(link === 'Home' ? '/' : `/${link.toLowerCase()}`)
                  ? 'text-white'
                  : 'text-richblack-25'
              }`}
            >
              {link}
              {isActiveLink(link === 'Home' ? '/' : `/${link.toLowerCase()}`) && (
                <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-yellow-400 rounded transition-all duration-300"></span>
              )}
            </Link>
          ))}
          {token && (
            <Link
              to={dashboardPath}
              onClick={() => setIsMobileNavOpen(false)}
              className={`relative hover:text-white transition ${
                isActiveLink('/dashboard') ? 'text-white' : 'text-richblack-25'
              }`}
            >
              Dashboard
              {isActiveLink('/dashboard') && (
                <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-yellow-400 rounded transition-all duration-300"></span>
              )}
            </Link>
          )}
          {!token && (
            <>
              <Link
                to="/login"
                onClick={() => setIsMobileNavOpen(false)}
                className="px-4 py-2 bg-yellow-50 text-black rounded-md hover:scale-95 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsMobileNavOpen(false)}
                className="px-4 py-2 bg-yellow-50 text-black rounded-md hover:scale-95 transition"
              >
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
