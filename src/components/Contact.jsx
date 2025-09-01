import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [status, setStatus] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // This effect handles the Netlify Forms success/error messages
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('success') === 'true') {
        setStatus('Message sent successfully! 🎉');
        // Clear the URL parameters
        window.history.replaceState({}, document.title, window.location.pathname);
        setTimeout(() => setStatus(null), 5000);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    
    const form = e.target;
    const formData = new FormData(form);
    
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      });
      
      if (response.ok) {
        setStatus('Message sent successfully! 🎉');
        // Reset form
        form.reset();
        // Clear status after 5 seconds
        setTimeout(() => setStatus(null), 5000);
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Failed to send message. Please try again.');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-2xl">
          <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm uppercase text-accent mb-2">Email</h4>
              <a 
                href="mailto:dhruvladani04@gmail.com" 
                className="text-lg hover:text-accent transition-colors"
              >
                dhruvladani04@gmail.com
              </a>
            </div>
            
            <div>
              <h4 className="text-sm uppercase text-accent mb-2">Phone</h4>
              <a 
                href="tel:+919429082869" 
                className="text-lg hover:text-accent transition-colors"
              >
                +91 94290 82869
              </a>
            </div>
            
            <div>
              <h4 className="text-sm uppercase text-accent mb-2">Connect</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://www.linkedin.com/in/dhruv-ladani-a65578252" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                  aria-label="LinkedIn"
                >
                  <span className="text-lg">LinkedIn</span>
                </a>
                <a 
                  href="https://github.com/dhruvladani04" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                  aria-label="GitHub"
                >
                  <span className="text-lg">GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="glass p-8 rounded-2xl">
          <h3 className="text-xl font-semibold mb-6">Send Me a Message</h3>
          
          <form 
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            action="/form"
            className="space-y-6"
          >
            {/* The `form-name` is used by Netlify to identify the form */}
            <input type="hidden" name="form-name" value="contact" />
            
            {/* Honeypot field to catch bots */}
            <div className="hidden">
              <label>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                aria-required="true"
                className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email <span className="text-accent">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                aria-required="true"
                className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message <span className="text-accent">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                aria-required="true"
                rows="4"
                className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition"
                placeholder="Your message here..."
              ></textarea>
            </div>
            
            <div className="flex items-center">
              <button
                type="submit"
                className="px-6 py-2 bg-accent text-black font-medium rounded-lg hover:bg-accent/90 transition-colors"
              >
                Send Message
              </button>
              
              {status && (
                <span className="ml-4 text-sm">
                  {status}
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  )
}
