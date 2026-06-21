import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiArrowUpRight,
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhone,
} from 'react-icons/fi';
import { GiPunchBlast, GiPowerButton } from 'react-icons/gi';
import SectionHeading from './SectionHeading';
import { cardPop, viewport } from '../utils/motion';

const initialForm = {
  name: '',
  email: '',
  message: '',
};

const contactLinks = [
  {
    label: 'Secure Email',
    value: 'dhruvladani04@gmail.com',
    href: 'mailto:dhruvladani04@gmail.com',
    icon: FiMail,
  },
  {
    label: 'Direct Line',
    value: '+91 94290 82869',
    href: 'tel:+919429082869',
    icon: FiPhone,
  },
  {
    label: 'LinkedIn',
    value: 'Professional network',
    href: 'https://www.linkedin.com/in/dhruv-ladani-a65578252',
    icon: FiLinkedin,
  },
  {
    label: 'GitHub',
    value: 'Source archives',
    href: 'https://github.com/dhruvladani04',
    icon: FiGithub,
  },
];

function HUDContactDecoration() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 opacity-40" style={{ borderColor: 'var(--arc-blue)' }} />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 opacity-40" style={{ borderColor: 'var(--arc-blue)' }} />

      {/* Animated scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px opacity-30"
        style={{ background: 'linear-gradient(90deg, transparent, var(--arc-blue), transparent)' }}
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />

      {/* Status indicators */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{ background: 'var(--arc-blue)', boxShadow: 'var(--arc-glow)' }}
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="font-mono text-xs tracking-wider" style={{ color: 'var(--arc-blue)' }}>SECURE</span>
      </div>
    </div>
  );
}

export default function Contact() {
  const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      setStatus({ type: 'success', message: 'Message transmitted successfully. Thanks for reaching out.' });
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (!status || status.type === 'pending') {
      return undefined;
    }

    const timer = window.setTimeout(() => setStatus(null), 5000);
    return () => window.clearTimeout(timer);
  }, [status]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: 'pending', message: 'Transmitting message...' });

    const payload = new FormData(event.target);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(payload).toString(),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setFormData(initialForm);
      setStatus({ type: 'success', message: 'Transmission complete. I will respond soon.' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setStatus({ type: 'error', message: 'Transmission failed. Please try again or email directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusClass =
    status?.type === 'success'
      ? 'text-[var(--arc-blue)]'
      : status?.type === 'error'
        ? 'text-[#ff9b9b]'
        : 'text-slate-400';

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="INITIATE PROTOCOL"
        title="Let's build something meaningful"
        description="If you have an opportunity, an idea, or just want to talk through a project, I'm always happy to connect."
      />

      <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
        <motion.div
          className="panel panel-highlight p-7 md:p-8 relative overflow-hidden"
          variants={cardPop}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <HUDContactDecoration />

          <div className="relative z-10 space-y-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--accent-gold)' }}>TARGET MISSION</p>
              <h3 className="mt-2 font-display text-2xl md:text-3xl font-semibold text-white">
                AI product work, engineering roles, and ambitious projects.
              </h3>
              <p className="mt-4 text-base leading-7 text-slate-300">
                I enjoy conversations where thoughtful product direction meets solid execution.
                If that sounds like your team or project, let's talk.
              </p>
            </div>

            <div className="grid gap-3">
              {contactLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="contact-link group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="accent-icon icon-shell inline-flex h-11 w-11 items-center justify-center rounded-2xl text-lg transition-all duration-300 group-hover:shadow-[var(--arc-glow)]">
                        <Icon />
                      </span>
                      <div>
                        <p className="font-semibold text-white">{item.label}</p>
                        <p className="text-sm text-slate-400">{item.value}</p>
                      </div>
                    </div>
                    <FiArrowUpRight className="text-slate-400 transition-transform group-hover:translate-y-[-2px] group-hover:translate-x-[2px]" />
                  </motion.a>
                );
              })}
            </div>

            <div className="soft-divider" />

            <div className="flex flex-wrap gap-3">
              <a
                href="/Dhruv_Ladani_Resume_Tech.pdf"
                download="Dhruv_Ladani_Resume_Tech.pdf"
                className="btn-secondary group"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: 'var(--arc-blue)', boxShadow: 'var(--arc-glow)' }} />
                  Tech Resume
                </span>
                <FiDownload className="transition-transform group-hover:translate-y-[2px]" />
              </a>
              <a
                href="/Dhruv_Ladani_Resume_PM.pdf"
                download="Dhruv_Ladani_Resume_PM.pdf"
                className="btn-secondary group"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: 'var(--accent-gold)', boxShadow: 'var(--gold-glow)' }} />
                  PM Resume
                </span>
                <FiDownload className="transition-transform group-hover:translate-y-[2px]" />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="panel p-7 md:p-8 relative overflow-hidden"
          variants={cardPop}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <HUDContactDecoration />

          <div className="relative z-10">
            <div className="mb-6">
              <p className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--accent-gold)' }}>ESTABLISH CONNECTION</p>
              <h3 className="mt-2 font-display text-2xl md:text-3xl font-semibold text-white">
                Transmit your message.
              </h3>
            </div>

            <form
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              action="/form"
              className="space-y-5"
            >
              <input type="hidden" name="form-name" value="contact" />

              <div className="hidden">
                <label htmlFor="bot-field">
                  Do not fill this field
                  <input id="bot-field" name="bot-field" />
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--arc-blue)' }}>
                    Identity Code
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-field"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--arc-blue)' }}>
                    Communication Channel
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-field"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--arc-blue)' }}>
                  Data Transmission
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="form-field resize-none"
                  placeholder="Describe the mission, project, or opportunity..."
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <motion.button
                  type="submit"
                  className="btn-primary w-fit group"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center gap-2">
                    <GiPunchBlast className="text-lg" />
                    {isSubmitting ? 'Transmitting...' : 'Initialize Contact'}
                  </span>
                  <FiArrowUpRight className="transition-transform group-hover:translate-y-[-2px] group-hover:translate-x-[2px]" />
                </motion.button>

                {status && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-sm font-mono ${statusClass}`}
                  >
                    {status.message}
                  </motion.p>
                )}
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
