import React from 'react'
import { experience } from '../data/experience'
import { motion } from 'framer-motion'

export default function Experience() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Experience</h2>

      <div className="space-y-4">
        {experience.map(e => (
          <motion.div 
            key={e.id} 
            className="glass rounded-xl p-5" 
            initial={{ y: 6, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
              <div>
                <h3 className="font-semibold text-lg">{e.company}</h3>
                <p className="text-slate-400">{e.role}</p>
              </div>
              <div className="text-sm text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full">
                {e.timeframe}
              </div>
            </div>

            <ul className="mt-4 space-y-2 pl-5">
              {e.bullets.map((b, i) => (
                <li key={i} className="relative before:content-['•'] before:absolute before:-left-5 before:text-accent pl-2 text-slate-300">
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
