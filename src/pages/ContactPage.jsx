import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowUpRight, FiDownload, FiGithub, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi';
import { GiPunchBlast } from 'react-icons/gi';

const contactMethods = [
  {
    label: 'Email',
    value: 'dhruvladani04@gmail.com',
    href: 'mailto:dhruvladani04@gmail.com',
    icon: FiMail,
    primary: true,
  },
  {
    label: 'Phone',
    value: '+91 94290 82869',
    href: 'tel:+919429082869',
    icon: FiPhone,
    primary: false,
  },
  {
    label: 'LinkedIn',
    value: 'Connect with me',
    href: 'https://www.linkedin.com/in/dhruv-ladani-a65578252',
    icon: FiLinkedin,
    primary: false,
  },
  {
    label: 'GitHub',
    value: 'View my projects',
    href: 'https://github.com/dhruvladani04',
    icon: FiGithub,
    primary: false,
  },
];

export default function ContactPage() {
  const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      setStatus({ type: 'success', message: 'Message sent successfully.' });
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((curr) => ({ ...curr, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: 'pending', message: 'Sending...' });

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(e.target)).toString(),
      });

      if (!response.ok) throw new Error('Failed');
      setFormData({ name: '', email: '', message: '' });
      setStatus({ type: 'success', message: 'Message sent. I\'ll get back to you soon.' });
    } catch {
      setStatus({ type: 'error', message: 'Failed. Please email me directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="section-shell pt-32 pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Back link */}
        <Link to="/" className="link-inline inline-flex items-center gap-2 mb-12 group">
          <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
          Back to home
        </Link>

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--arc-blue))' }} />
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--arc-blue)' }}>CONTACT</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Let's work{' '}
            <span className="text-gradient">together</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl">
            I'm actively looking for AI, software engineering, and product roles.
            If you're working on something interesting, I'd love to chat.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8">
          {/* Contact methods */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {contactMethods.map((method, i) => {
              const Icon = method.icon;
              return (
                <motion.a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noreferrer' : undefined}
                  className={`panel p-6 block group hover:scale-[1.01] transition-transform ${method.primary ? 'panel-highlight' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 opacity-20 group-hover:opacity-50 transition-opacity" style={{ borderColor: 'var(--arc-blue)' }} />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: method.primary ? 'rgba(0, 217, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)' }}
                      >
                        <Icon className="text-xl" style={{ color: method.primary ? 'var(--arc-blue)' : 'var(--muted)' }} />
                      </div>
                      <div>
                        <p className="font-mono text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--arc-blue)' }}>{method.label}</p>
                        <p className="font-medium text-white">{method.value}</p>
                      </div>
                    </div>
                    <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: 'var(--arc-blue)' }} />
                  </div>
                </motion.a>
              );
            })}

            {/* Resumes */}
            <motion.div
              className="panel p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <p className="font-mono text-xs uppercase tracking-wider mb-4" style={{ color: 'var(--accent-gold)' }}>RESUMES</p>
              <div className="flex flex-wrap gap-3">
                <a href="/Dhruv_Ladani_Resume_Tech.pdf" download className="btn-secondary group">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: 'var(--arc-blue)', boxShadow: 'var(--arc-glow)' }} />
                    Tech Resume
                  </span>
                  <FiDownload className="transition-transform group-hover:translate-y-0.5" />
                </a>
                <a href="/Dhruv_Ladani_Resume_PM.pdf" download className="btn-secondary group">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: 'var(--accent-gold)', boxShadow: 'var(--gold-glow)' }} />
                    PM Resume
                  </span>
                  <FiDownload className="transition-transform group-hover:translate-y-0.5" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="panel panel-highlight p-8 relative overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* HUD corners */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 opacity-30" style={{ borderColor: 'var(--arc-blue)' }} />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 opacity-30" style={{ borderColor: 'var(--arc-blue)' }} />

            {/* Status indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{ background: 'var(--arc-blue)', boxShadow: 'var(--arc-glow)' }}
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="font-mono text-xs tracking-wider" style={{ color: 'var(--arc-blue)' }}>ONLINE</span>
            </div>

            <div className="relative z-10">
              <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--accent-gold)' }}>SEND A MESSAGE</p>
              <h2 className="font-display text-2xl font-semibold text-white mb-6">Get in touch</h2>

              <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <input type="hidden" name="form-name" value="contact" />
                <div className="hidden">
                  <label htmlFor="bot-field">
                    <input id="bot-field" name="bot-field" />
                  </label>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block font-mono text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--arc-blue)' }}>Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-field"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-mono text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--arc-blue)' }}>Email</label>
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
                  <label htmlFor="message" className="block font-mono text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--arc-blue)' }}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="form-field resize-none"
                    placeholder="Tell me about the opportunity or project..."
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <motion.button
                    type="submit"
                    className="btn-primary"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center gap-2">
                      <GiPunchBlast className="text-lg" />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </span>
                    <FiArrowUpRight />
                  </motion.button>

                  {status && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm font-mono"
                      style={{ color: status.type === 'success' ? 'var(--arc-blue)' : 'var(--accent-red)' }}
                    >
                      {status.message}
                    </motion.span>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
