import React, { useState } from 'react'
import { projects } from '../data/projects'
import { motion, AnimatePresence } from 'framer-motion'

export default function Projects() {
  const [showPopup, setShowPopup] = useState(false)
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Projects</h2>
      <div className="space-y-4">
        {projects.map((p, index) => (
          <motion.div 
            key={p.id}
            className="glass rounded-xl p-5"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
              <div>
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="text-slate-400">{p.timeframe}</p>
              </div>
            </div>

            <p className="mt-3 text-slate-200">{p.summary}</p>

            <ul className="mt-4 space-y-2 pl-5">
              {p.bullets.map((b, i) => (
                <li key={i} className="relative before:content-['•'] before:absolute before:-left-5 before:text-accent pl-2 text-slate-300">
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              {p.tech.map(t => (
                <span key={t} className="px-3 py-1 text-xs rounded-full bg-slate-800/50">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-4">
              {p.id === 'mental-fitness-journal' ? (
                <button
                  onClick={() => setShowPopup(true)}
                  className="text-accent hover:underline cursor-pointer"
                >
                  View Project
                </button>
              ) : (
                <a 
                  href={p.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  View Project
                </a>
              )}
            </div>
            
            <AnimatePresence>
              {showPopup && p.id === 'mental-fitness-journal' && (
                <motion.div 
                  className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowPopup(false)}
                >
                  <motion.div 
                    className="bg-slate-800 rounded-xl p-6 max-w-md w-full mx-4 relative"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button 
                      onClick={() => setShowPopup(false)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-white"
                      aria-label="Close"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <h3 className="text-xl font-bold mb-2">Project Under Development</h3>
                    <p className="text-slate-300 mb-4">
                      The Mental Fitness Journal is currently undergoing improvements and touch-ups. I'm working hard to enhance the user experience and add new features.
                    </p>
                    <p className="text-slate-400 text-sm">
                      Check back soon for updates, or feel free to reach out if you'd like to learn more about this project!
                    </p>
                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={() => setShowPopup(false)}
                        className="px-4 py-2 bg-accent text-black font-medium rounded-lg hover:bg-accent/90 transition-colors"
                      >
                        Got it!
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
