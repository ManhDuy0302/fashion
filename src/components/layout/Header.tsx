import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);
  const { totalItems } = useCart();

  const navLinks = [
    { to: '/', label: 'Trang chủ' },
    { to: '/shop', label: 'Cửa hàng' },
    { to: '/about', label: 'Về chúng tôi' },
    { to: '/contact', label: 'Liên hệ' },
  ];

  const collections = [
    { to: '/shop?collection=spring-summer', label: 'Xuân Hè 2026' },
    { to: '/shop?collection=autumn-winter', label: 'Thu Đông 2026' },
    { to: '/shop?collection=minimal', label: 'Tối Giản' },
    { to: '/shop?collection=elegant', label: 'Thanh Lịch' },
  ];

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-pink-100"
    >
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl md:text-3xl font-serif font-semibold bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">
              ÉLÉGANCE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-base font-semibold transition-colors duration-300 ${
                    isActive
                      ? 'text-pink-500'
                      : 'text-gray-700 hover:text-pink-500'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            
            {/* Collections Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsCollectionOpen(true)}
              onMouseLeave={() => setIsCollectionOpen(false)}
            >
              <button className="text-base font-semibold text-gray-700 hover:text-pink-500 transition-colors flex items-center gap-1">
                Bộ sưu tập
                <svg className={`w-4 h-4 transition-transform ${isCollectionOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <AnimatePresence>
                {isCollectionOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-pink-100 py-3 overflow-hidden"
                  >
                    {collections.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="block px-5 py-2.5 text-base font-medium text-gray-700 hover:text-pink-500 hover:bg-pink-50 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2.5 text-gray-700 hover:text-pink-500 transition-colors bg-pink-50 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-pink-500 rounded-full"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2.5 text-gray-700 bg-pink-50 rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Mở menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden border-t border-pink-100"
            >
              <div className="flex flex-col space-y-4 py-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `text-lg font-semibold ${
                          isActive ? 'text-pink-500' : 'text-gray-700'
                        }`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
                
                {/* Mobile Collections */}
                <div className="pt-2 border-t border-pink-100">
                  <p className="text-sm font-bold text-pink-500 uppercase tracking-wider mb-3">Bộ sưu tập</p>
                  {collections.map((item, i) => (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (navLinks.length + i) * 0.05 }}
                    >
                      <Link
                        to={item.to}
                        className="block py-2 text-base font-medium text-gray-600 hover:text-pink-500"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
