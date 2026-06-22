import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/work', label: 'Work' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Progress indicator - not a full progress bar, just a subtle top line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-px z-50"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, var(--arc-blue) 50%, transparent 100%)',
          opacity: scrolled ? 0.5 : 0.2,
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1 }}
      />

      <motion.nav
        className="fixed inset-x-0 top-4 z-40"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div
            className={`nav-frame ${scrolled ? 'nav-scrolled' : ''}`}
            style={{ width: '100%' }}
          >
            {/* Logo */}
            <Link to="/" className="nav-brand flex items-center gap-3">
              <motion.span
                className="brand-mark"
                animate={{ boxShadow: scrolled ? 'var(--arc-glow)' : 'var(--red-glow)' }}
                transition={{ duration: 0.3 }}
              >
                DL
              </motion.span>
              <span className="hidden sm:block">
                <p className="font-display text-base font-semibold">Dhruv Ladani</p>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="nav-links-shell hidden md:flex items-center gap-1 px-2 py-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Actions */}
            <div className="nav-actions flex items-center gap-2">
              <Link to="/contact" className="btn-secondary hidden lg:inline-flex text-sm group">
                <span className="flex items-center gap-2">
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: 'var(--arc-blue)', boxShadow: 'var(--arc-glow)' }}
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  Contact
                </span>
                <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              {/* Mobile menu button */}
              <button
                type="button"
                className="icon-button md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
              >
                {open ? <FiX size={20} /> : <FiMenu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {open && (
              <motion.div
                className="mobile-sheet md:hidden"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {navLinks.map((link, i) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`mobile-nav-link rounded-xl px-4 py-3 mb-2 flex justify-between items-center ${
                        isActive ? 'mobile-nav-link-active' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: isActive ? 'var(--arc-blue)' : 'var(--muted)' }}
                        />
                        {link.label}
                      </div>
                      <FiArrowUpRight style={{ opacity: 0.5 }} size={14} />
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  );
}
