import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, MapPin, Phone, Facebook, Twitter, Instagram, User, UserPlus, LogOut } from 'lucide-react';
// import { useAuth } from '@/pages/Authsystem';
import { useAuth } from '@/pages/auth-context';
import UserDropdown from '../components/UserDropdown';
const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Packages', path: '/packages' },
    { name: 'Amenities', path: '/amenities' },
    { name: 'Events', path: '/events' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
        ? 'shadow-lg'
        : 'backdrop-blur-sm'
      }`} style={{
        background: isScrolled
          ? 'linear-gradient(to right, rgb(118, 37, 79), rgb(118, 37, 79))'
          : 'linear-gradient(to right, rgba(118, 37, 79), rgba(118, 37, 79))'
      }}>
      {/* Top Bar */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            {/* Left Side - Location & Phone */}
            <div className="hidden md:flex items-center space-x-6 text-white text-sm">
              <div className="flex items-center space-x-2 text-xs">
                <MapPin className="h-4 w-4" />
                <span>108, Murthuzaguda,Moinabad</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <Phone className="h-4 w-4" />
                <span>+91 96977 98888</span>
              </div>
            </div>

            {/* Center - Logo */}
            <Link to="/" className="flex items-center">
              <img
                src="/log.png"
                alt="Vivenza Logo"
                className="h-16 w-auto"
              />
            </Link>

            {/* Right Side - Social Icons & Auth */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Social Icons */}
              <div className="flex items-center space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="text-white hover:text-yellow-400 transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>

              {/* Divider */}
              <div className="h-4 w-px bg-white/30"></div>

              {/* Auth Links - Conditional rendering */}
              {/* {user ? (
                <div className="flex items-center space-x-4 text-white text-sm">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-1 hover:text-yellow-400 transition-colors duration-300"
                  >
                    <User className="h-4 w-4" />
                    <span>PROFILE</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 hover:text-yellow-400 transition-colors duration-300"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>LOGOUT</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4 text-white text-sm">
                  <Link
                    to="/login"
                    className="flex items-center space-x-1 hover:text-yellow-400 transition-colors duration-300"
                  >
                    <User className="h-4 w-4" />
                    <span>LOGIN</span>
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center space-x-1 hover:text-yellow-400 transition-colors duration-300"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>REGISTER</span>
                  </Link>
                </div>
              )} */}
              <UserDropdown />
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex justify-center w-full">
            <div className="flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative font-medium text-white hover:text-yellow-400 transition-colors duration-300 group"
                >
                  {link.name}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Book Now Button (Desktop) */}
          <div className="hidden lg:block absolute right-4">
            <Link
              to="/booking"
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-2 rounded-full font-semibold whitespace-nowrap hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              style={{ color: 'rgb(118, 37, 79)' }}
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden shadow-xl animate-fade-in" style={{
          background: 'linear-gradient(to bottom, rgb(118, 37, 79), rgb(118, 37, 79))'
        }}>
          <div className="flex flex-col py-6 space-y-3 px-6">
            {/* Mobile Contact Info */}
            <div className="border-b border-white/10 pb-4 mb-4">
              <div className="flex flex-col space-y-2 text-white text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>225 Beach Street, Australian</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>1-548-854-8898</span>
                </div>
              </div>
            </div>

            {/* Mobile Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="py-2 px-4 text-white font-medium transition-colors rounded-lg hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Auth Links */}
            <div className="border-t border-white/10 pt-4 mt-4">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors duration-300 mb-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    <span>PROFILE</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors duration-300 mb-4"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>LOGOUT</span>
                  </button>
                </>
              ) : (
                <div className="flex space-x-4 mb-4">
                  <Link
                    to="/login"
                    className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    <span>LOGIN</span>
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>REGISTER</span>
                  </Link>
                </div>
              )}

              {/* Mobile Social Icons */}
              <div className="flex items-center space-x-4 mb-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="text-white hover:text-yellow-400 transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>

              {/* Mobile Book Now Button */}
              <Link
                to="/booking"
                className="block bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-6 py-3 rounded-full font-semibold text-center hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300"
                style={{ color: 'rgb(118, 37, 79)' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;