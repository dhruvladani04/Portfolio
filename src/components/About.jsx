import React from 'react'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h2 className="text-3xl font-bold mb-4">About</h2>
      <div className="glass rounded-xl p-6 space-y-6">
        <div className="space-y-4">
          <p className="text-slate-200">
            I'm Dhruv Ladani — a Computer Engineering student (B.Tech, CGPA 9.34) at Pandit Deendayal Energy University, graduating in 2026. I'm a curious, hardworking technologist with over six years of coding experience—starting with Java, expanding into C++ through competitive programming, and recently strengthening my data-structures and algorithms foundation. I've built full-stack solutions with the MERN stack and Django in Python, and I'm deeply fascinated by data—whether it's engineering pipelines, analyzing patterns, or applying data science methods. On the AI/ML front, I've explored generative AI and LLMs, integrating APIs and prototyping agentic workflows. I enjoy building AI/ML-enabled products and shipping end-to-end software, while also venturing into product management and growth strategy to blend technical build, user insights, and data-driven roadmaps into scalable, impactful solutions.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-700 grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Contact</h3>
            <p className="text-slate-300">+91-9429082869 · dhruvladani04@gmail.com</p>
          </div>

          <div>
            <h3 className="font-semibold">Links</h3>
            <p className="text-slate-300">
              <a href="https://github.com/dhruvladani04" target="_blank" rel="noreferrer" className="hover:text-accent">github.com/dhruvladani04</a> · 
              <a href="https://www.linkedin.com/in/dhruv-ladani-a65578252" target="_blank" rel="noreferrer" className="hover:text-accent"> LinkedIn</a>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
