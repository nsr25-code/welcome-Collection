import React, { useState, useEffect } from 'react';
import { Menu, X, Search, ShoppingBag, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Products', href: '#products' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className={`text-2xl font-serif font-bold tracking-tighter transition-colors duration-300 ${scrolled ? 'text-burgundy' : 'text-white'}`}>
              WELCOME <span className={scrolled ? 'text-gold' : 'text-gold'}>COLLECTION</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${scrolled ? 'text-slate-700 hover:text-gold' : 'text-white hover:text-gold'}`}
              >
                {link.name}
              </a>
            ))}
            <div className={`flex items-center space-x-4 ml-4 ${scrolled ? 'text-slate-700' : 'text-white'}`}>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Search size={20} />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <ShoppingBag size={20} />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className={`md:hidden flex items-center space-x-4 ${scrolled ? 'text-slate-700' : 'text-white'}`}>
             <button className="p-2 hover:bg-white/10 rounded-full">
                <ShoppingBag size={20} />
              </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-white/10 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-slate-700 hover:text-burgundy hover:bg-slate-50 rounded-lg transition-all"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 flex items-center space-x-4 px-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full bg-slate-100 border-none rounded-full py-2 px-4 text-sm focus:ring-2 focus:ring-gold"
                  />
                  <Search className="absolute right-3 top-2.5 text-slate-400" size={16} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
