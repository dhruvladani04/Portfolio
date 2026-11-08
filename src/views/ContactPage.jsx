'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FiArrowLeft, FiArrowUpRight, FiBriefcase, FiDownload, FiGithub, FiLinkedin, FiMail, FiPhone, FiZap } from 'react-icons/fi';

// Official Topmate logo mark (react-icons has no Topmate icon)
function TopmateIcon(props) {
  return (
    <svg viewBox="0 0 29 29" fill="none" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="#000" d="M15.3 28.29a12.99 12.99 0 1 0 0-25.98 12.99 12.99 0 0 0 0 25.98Z" />
      <path fill="#E44332" stroke="#000" strokeWidth="2" d="M26.14 13.57a12.57 12.57 0 1 1-25.14 0 12.57 12.57 0 0 1 25.14 0Z" />
      <path fill="#fff" d="M19.19 17.52a6.96 6.96 0 1 1 .3-7.55l-5.98 3.54 5.68 4.01Z" />
    </svg>
  );
}
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
  {
    label: 'Topmate',
    value: 'Book a 1:1 session',
    href: 'https://topmate.io/dhruv_ladani04/',
    icon: TopmateIcon,
    primary: false,
  },
];

// Two short forms so inbound arrives pre-sorted. Each `key` is also the
// Netlify form name, and every field name here must match the hidden
// registration in public/form.html or Netlify drops it.
const ENQUIRY_FORMS = {
  hiring: {
    label: 'Hiring for a full-time role',
    icon: FiBriefcase,
    blurb: 'Tell me about the role and the team.',
    fields: [
      { name: 'company', label: 'Company', type: 'text', required: true, placeholder: 'Where you\'re hiring' },
      { name: 'role', label: 'Role or job link', type: 'text', required: false, placeholder: 'e.g. ML Engineer, or a link to the JD' },
      { name: 'message', label: 'Message', type: 'textarea', required: true, placeholder: 'Anything I should know about the role or the team...' },
    ],
  },
  freelance: {
    label: 'Freelance project',
    icon: FiZap,
    blurb: 'Describe what you want built and I\'ll reply to set up a 30-minute scoping call.',
    fields: [
      { name: 'company', label: 'Company (optional)', type: 'text', required: false, placeholder: 'Startup, agency, or just you' },
      { name: 'timeline', label: 'Timeline (optional)', type: 'text', required: false, placeholder: 'e.g. demo needed by mid-December' },
      { name: 'project', label: 'What do you want built?', type: 'textarea', required: true, placeholder: 'The idea, the data you have, and what a useful first version looks like...' },
    ],
  },
};

// `/contact?form=hiring|freelance` (J.A.R.V.I.S. links here) preselects a
// form. It reads the query in its own Suspense boundary so the rest of the
// page still prerenders into the static export, and it re-runs when the
// query changes while already on /contact.
function FormFromQuery({ onForm }) {
  const form = useSearchParams().get('form');
  useEffect(() => {
    if (form && ENQUIRY_FORMS[form]) onForm(form);
  }, [form, onForm]);
  return null;
}

export default function ContactPage() {
  const [formType, setFormType] = useState(null); // 'hiring' | 'freelance' | null
  const [values, setValues] = useState({});
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      setStatus({ type: 'success', message: 'Message sent successfully.' });
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const chooseForm = (type) => {
    setFormType(type);
    setStatus(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((curr) => ({ ...curr, [name]: value }));
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
      setValues({});
      setStatus({ type: 'success', message: 'Message sent. I\'ll get back to you soon.' });
    } catch {
      setStatus({ type: 'error', message: 'Failed. Please email me directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeForm = formType ? ENQUIRY_FORMS[formType] : null;

  return (
    <div className="section-shell pt-32 pb-20 min-h-screen">
      <Suspense fallback={null}>
        <FormFromQuery onForm={setFormType} />
      </Suspense>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Back link */}
        <Link href="/" className="link-inline inline-flex items-center gap-2 mb-12 group">
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
            Currently an Associate Application Engineer (AI/ML) at Impresa.ai. Open to
            full-time roles in AI/ML engineering, forward-deployed engineering and AI
            product, and to a small number of freelance builds.
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

          {/* Enquiry: pick a type, then a short form for it */}
          <motion.div
            className="panel panel-highlight p-8 relative overflow-hidden self-start"
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
              <h2 className="font-display text-2xl font-semibold text-white mb-6">What brings you here?</h2>

              <div className="grid sm:grid-cols-2 gap-3 mb-6" role="group" aria-label="Type of enquiry">
                {Object.entries(ENQUIRY_FORMS).map(([key, form]) => {
                  const Icon = form.icon;
                  const active = formType === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      aria-pressed={active}
                      aria-controls="enquiry-form"
                      onClick={() => chooseForm(key)}
                      className="panel p-4 text-left flex items-center gap-3 transition-transform hover:scale-[1.02]"
                      style={active ? { borderColor: 'var(--arc-blue)', boxShadow: '0 0 0 1px var(--arc-blue)' } : undefined}
                    >
                      <span
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: active ? 'rgba(0, 217, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)' }}
                      >
                        <Icon style={{ color: active ? 'var(--arc-blue)' : 'var(--muted)' }} />
                      </span>
                      <span className="font-medium text-white leading-snug">{form.label}</span>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                {!activeForm ? (
                  <motion.p
                    key="hint"
                    className="text-slate-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Pick one to open a short form, or email me directly at{' '}
                    <a href="mailto:dhruvladani04@gmail.com" className="link-inline">dhruvladani04@gmail.com</a>.
                  </motion.p>
                ) : (
                  <motion.form
                    key={formType}
                    id="enquiry-form"
                    name={formType}
                    method="POST"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <input type="hidden" name="form-name" value={formType} />
                    <div className="hidden">
                      <label htmlFor={`${formType}-bot-field`}>
                        <input id={`${formType}-bot-field`} name="bot-field" />
                      </label>
                    </div>

                    <p className="text-slate-400">
                      {activeForm.blurb}
                      {formType === 'freelance' && (
                        <>
                          {' '}
                          <Link href="/work-with-me" className="link-inline">See packages and process</Link>.
                        </>
                      )}
                    </p>

                    <div className="grid md:grid-cols-2 gap-5">
                      {[
                        { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                        { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
                      ].map((field) => (
                        <div key={field.name}>
                          <label htmlFor={`${formType}-${field.name}`} className="block font-mono text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--arc-blue)' }}>{field.label}</label>
                          <input
                            id={`${formType}-${field.name}`}
                            name={field.name}
                            type={field.type}
                            value={values[field.name] || ''}
                            onChange={handleChange}
                            required
                            className="form-field"
                            placeholder={field.placeholder}
                          />
                        </div>
                      ))}
                    </div>

                    {activeForm.fields.map((field) => (
                      <div key={field.name}>
                        <label htmlFor={`${formType}-${field.name}`} className="block font-mono text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--arc-blue)' }}>{field.label}</label>
                        {field.type === 'textarea' ? (
                          <textarea
                            id={`${formType}-${field.name}`}
                            name={field.name}
                            value={values[field.name] || ''}
                            onChange={handleChange}
                            required={field.required}
                            rows={4}
                            className="form-field resize-none"
                            placeholder={field.placeholder}
                          />
                        ) : (
                          <input
                            id={`${formType}-${field.name}`}
                            name={field.name}
                            type={field.type}
                            value={values[field.name] || ''}
                            onChange={handleChange}
                            required={field.required}
                            className="form-field"
                            placeholder={field.placeholder}
                          />
                        )}
                      </div>
                    ))}

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
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              {status && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm font-mono mt-4"
                  role="status"
                  style={{ color: status.type === 'error' ? 'var(--accent-red)' : 'var(--arc-blue)' }}
                >
                  {status.message}
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
