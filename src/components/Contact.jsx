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
import SectionHeading from './SectionHeading';
import { cardPop, viewport } from '../utils/motion';

const initialForm = {
  name: '',
  email: '',
  message: '',
};

const contactLinks = [
  {
    label: 'Email',
    value: 'dhruvladani04@gmail.com',
    href: 'mailto:dhruvladani04@gmail.com',
    icon: FiMail,
  },
  {
    label: 'Phone',
    value: '+91 94290 82869',
    href: 'tel:+919429082869',
    icon: FiPhone,
  },
  {
    label: 'LinkedIn',
    value: 'Connect professionally',
    href: 'https://www.linkedin.com/in/dhruv-ladani-a65578252',
    icon: FiLinkedin,
  },
  {
    label: 'GitHub',
    value: 'Browse my repositories',
    href: 'https://github.com/dhruvladani04',
    icon: FiGithub,
  },
];

export default function Contact() {
  const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      setStatus({ type: 'success', message: 'Message sent successfully. Thanks for reaching out.' });
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
    setStatus({ type: 'pending', message: 'Sending your message...' });

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
      setStatus({ type: 'success', message: 'Message sent successfully. I will get back to you soon.' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setStatus({ type: 'error', message: 'Something went wrong. Please try again or email me directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusClass =
    status?.type === 'success'
      ? 'text-[var(--accent-violet)]'
      : status?.type === 'error'
        ? 'text-[#ff9b9b]'
        : 'text-slate-400';

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Contact"
        title="Let&apos;s build something useful together."
        description="If you have an opportunity, an idea, or just want to talk through a project, I&apos;m always happy to connect."
      />

      <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
        <motion.div
          className="panel panel-highlight p-7 md:p-8"
          variants={cardPop}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Best fit</p>
              <h3 className="mt-2 font-display text-3xl font-semibold text-white">
                AI product work, engineering roles, and ambitious side projects.
              </h3>
              <p className="mt-4 text-base leading-7 text-slate-300">
                I enjoy conversations where thoughtful product direction meets solid execution.
                If that sounds like your team or project, let&apos;s talk.
              </p>
            </div>

            <div className="grid gap-3">
              {contactLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="contact-link"
                  >
                    <div className="flex items-center gap-3">
                      <span className="accent-icon icon-shell inline-flex h-11 w-11 items-center justify-center rounded-2xl text-lg">
                        <Icon />
                      </span>
                      <div>
                        <p className="font-semibold text-white">{item.label}</p>
                        <p className="text-sm text-slate-400">{item.value}</p>
                      </div>
                    </div>
                    <FiArrowUpRight className="text-slate-400" />
                  </a>
                );
              })}
            </div>

            <div className="soft-divider" />

            <div className="flex flex-wrap gap-3">
              <a
                href="/Dhruv_Ladani_Resume_Tech.pdf"
                download="Dhruv_Ladani_Resume_Tech.pdf"
                className="btn-secondary"
              >
                Tech Resume
                <FiDownload />
              </a>
              <a
                href="/Dhruv_Ladani_Resume_PM.pdf"
                download="Dhruv_Ladani_Resume_PM.pdf"
                className="btn-secondary"
              >
                PM Resume
                <FiDownload />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="panel p-7 md:p-8"
          variants={cardPop}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Send a message</p>
            <h3 className="mt-2 font-display text-3xl font-semibold text-white">
              Tell me what you&apos;re building.
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
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-200">
                  Name
                </label>
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
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
                  Email
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
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-200">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="form-field resize-none"
                placeholder="Tell me a little about the opportunity, project, or idea."
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button type="submit" className="btn-primary w-fit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send message'}
                <FiArrowUpRight />
              </button>

              {status && (
                <p className={`text-sm ${statusClass}`}>
                  {status.message}
                </p>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
