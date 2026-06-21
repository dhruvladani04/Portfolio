import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { FiArrowUpRight, FiMoon, FiSun } from 'react-icons/fi';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { GiPunchBlast } from 'react-icons/gi';

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ theme = 'dark', onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.2,
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const sections = links
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection?.target?.id) {
          setActiveId(visibleSection.target.id);
        }
      },
      {
        rootMargin: '-35% 0px -45% 0px',
        threshold: [0.2, 0.45, 0.7],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setOpen(false);
  const isLightTheme = theme === 'light';

  return (
    <>
      {/* Iron Man Arc Reactor Progress Bar */}
      <motion.div
        className="fixed left-0 top-0 z-50 h-[2px] w-full origin-left"
        style={{ scaleX: progress }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-red)] via-[var(--arc-blue)] to-[var(--accent-gold)]" />
        <div
          className="absolute right-0 top-1/2 w-3 h-3 -translate-y-1/2 rounded-full"
          style={{
            background: 'var(--arc-blue)',
            boxShadow: 'var(--arc-glow)',
          }}
        />
      </motion.div>

      <motion.nav
        className="fixed inset-x-0 top-4 z-40"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="mx-auto"
          style={{ width: 'min(var(--max-width), calc(100% - 2rem))' }}
        >
          <div className={`nav-frame ${scrolled ? 'nav-scrolled' : ''}`}>
            <a href="#home" className="nav-brand flex items-center gap-3" onClick={closeMenu}>
              <motion.span
                className="brand-mark"
                animate={{ boxShadow: scrolled ? 'var(--arc-glow)' : 'var(--red-glow)' }}
                transition={{ duration: 0.3 }}
              >
                DL
              </motion.span>
              <div className="hidden sm:block">
                <p className="font-display text-base font-semibold">Dhruv Ladani</p>
                <p className="text-xs font-mono uppercase tracking-[0.18em]" style={{ color: 'var(--arc-blue)' }}>
                  STARK PROTOCOL
                </p>
              </div>
            </a>

            <div className="nav-links-shell hidden xl:flex items-center justify-center gap-1 px-2 py-1">
              {links.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`nav-link ${activeId === link.id ? 'nav-link-active' : ''}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <div className="nav-actions flex items-center gap-2 md:gap-3">
              <a href="#contact" className="btn-secondary hidden lg:inline-flex group">
                <span className="flex items-center gap-2">
                  <GiPunchBlast className="text-[var(--accent-red)]" />
                  Initialize Contact
                </span>
                <FiArrowUpRight className="transition-transform group-hover:translate-y-[-2px] group-hover:translate-x-[2px]" />
              </a>

              <button
                type="button"
                className="theme-toggle hidden md:inline-flex"
                onClick={onToggleTheme}
                aria-label={`Switch to ${isLightTheme ? 'dark' : 'light'} mode`}
                title={`Switch to ${isLightTheme ? 'dark' : 'light'} mode`}
              >
                <motion.span
                  className="theme-toggle-glyph"
                  animate={{ rotate: isLightTheme ? 0 : 180 }}
                  transition={{ duration: 0.3 }}
                >
                  {isLightTheme ? <FiMoon size={16} /> : <FiSun size={16} />}
                </motion.span>
                <span className="hidden 2xl:inline font-mono text-xs uppercase tracking-wider">
                  {isLightTheme ? 'NIGHT MODE' : 'DAY MODE'}
                </span>
              </button>

              <button
                type="button"
                className="icon-button inline-flex h-11 w-11 items-center justify-center rounded-full xl:hidden"
                onClick={() => setOpen((current) => !current)}
                aria-expanded={open}
                aria-label="Toggle navigation menu"
              >
                <motion.div
                  animate={{ rotate: open ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {open ? <HiX size={24} /> : <HiMenuAlt4 size={24} />}
                </motion.div>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                className="mobile-sheet xl:hidden"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
              >
                {/* HUD Decorations */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 opacity-40" style={{ borderColor: 'var(--arc-blue)' }} />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 opacity-40" style={{ borderColor: 'var(--arc-blue)' }} />

                <div className="flex flex-col gap-3">
                  {links.map((link, index) => (
                    <motion.a
                      key={link.id}
                      href={`#${link.id}`}
                      onClick={closeMenu}
                      className={`mobile-nav-link rounded-2xl px-4 py-3 text-sm transition ${
                        activeId === link.id
                          ? 'mobile-nav-link-active'
                          : 'text-slate-300'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: activeId === link.id ? 'var(--arc-blue)' : 'var(--muted)' }} />
                        {link.label}
                      </div>
                    </motion.a>
                  ))}

                  <button
                    type="button"
                    onClick={onToggleTheme}
                    className="theme-toggle theme-toggle-mobile"
                    aria-label={`Switch to ${isLightTheme ? 'dark' : 'light'} mode`}
                  >
                    <span className="flex items-center gap-3">
                      <motion.span
                        className="theme-toggle-glyph"
                        animate={{ rotate: isLightTheme ? 0 : 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        {isLightTheme ? <FiMoon size={16} /> : <FiSun size={16} />}
                      </motion.span>
                      <span>{isLightTheme ? 'Switch to dark mode' : 'Switch to light mode'}</span>
                    </span>
                    <FiArrowUpRight />
                  </button>

                  <a
                    href="https://www.linkedin.com/in/dhruv-ladani-a65578252"
                    target="_blank"
                    rel="noreferrer"
                    className="mobile-link-card mt-2 inline-flex items-center justify-between rounded-2xl px-4 py-3 text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--arc-blue)', boxShadow: 'var(--arc-glow)' }} />
                      LinkedIn
                    </div>
                    <FiArrowUpRight />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  );
}
