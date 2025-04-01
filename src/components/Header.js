import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({ mobileMenuOpen, toggleMobileMenu }) => {
  // Navigation items
  const navItems = [
    { path: '/', label: '홈' },
    { path: '/about', label: '소개' },
    { path: '/gallery', label: '갤러리' },
    { path: '/ministries', label: '사역' },
    { path: '/contact', label: '문의' }
  ];

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-md py-4 sticky top-0 z-40">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <NavLink to="/" className="text-xl font-bold text-gray-800">holssi worship</NavLink>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {navItems.map(item => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => 
                      isActive 
                        ? 'text-indigo-500 font-bold hover:text-indigo-700 transition duration-300' 
                        : 'text-gray-800 hover:text-indigo-500 transition duration-300'
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            id="hamburger-btn"
            className="md:hidden text-gray-800 focus:outline-none"
            aria-label="메뉴 열기"
            onClick={toggleMobileMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-90 z-50 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className={`bg-white w-80 h-full absolute right-0 p-6 transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex justify-end mb-4">
            <button
              id="mobile-menu-close-btn"
              className="text-gray-700 focus:outline-none"
              aria-label="메뉴 닫기"
              onClick={toggleMobileMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <nav className="block">
            <ul className="space-y-4">
              {navItems.map(item => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => 
                      `block text-lg ${isActive ? 'text-indigo-500 font-bold' : 'text-gray-800'} hover:text-indigo-500 transition duration-300`
                    }
                    onClick={toggleMobileMenu}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;