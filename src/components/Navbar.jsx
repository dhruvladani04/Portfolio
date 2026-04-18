import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { HiMenuAlt4, HiX } from 'react-icons/hi';

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

export default function Navbar() {
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

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left bg-gradient-to-r from-[#7cf7d4] via-[#47d9ff] to-[#ffd37a]"
        style={{ scaleX: progress }}
      />

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
            <a href="#home" className="flex items-center gap-3" onClick={closeMenu}>
              <span className="brand-mark">DL</span>
              <div className="hidden sm:block">
                <p className="font-display text-base font-semibold">Dhruv Ladani</p>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                  AI x Product x Engineering
                </p>
              </div>
            </a>

            <div className="hidden xl:flex items-center gap-1 rounded-full border border-white/5 bg-white/[0.02] px-2 py-1">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`nav-link ${activeId === link.id ? 'nav-link-active' : ''}`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a href="#contact" className="btn-secondary hidden md:inline-flex">
                Let&apos;s talk
                <FiArrowUpRight />
              </a>

              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white transition hover:border-white/20 xl:hidden"
                onClick={() => setOpen((current) => !current)}
                aria-expanded={open}
                aria-label="Toggle navigation menu"
              >
                {open ? <HiX size={24} /> : <HiMenuAlt4 size={24} />}
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
                <div className="flex flex-col gap-3">
                  {links.map((link) => (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      onClick={closeMenu}
                      className={`rounded-2xl px-4 py-3 text-sm transition ${
                        activeId === link.id
                          ? 'bg-white/[0.05] text-white'
                          : 'text-slate-300 hover:bg-white/[0.03]'
                      }`}
                    >
                      {link.label}
                    </a>
                  ))}

                  <a
                    href="https://www.linkedin.com/in/dhruv-ladani-a65578252"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-sm text-slate-200"
                  >
                    LinkedIn
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
