import React from 'react'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h2 className="text-3xl font-bold mb-4">About</h2>
      <div className="glass rounded-xl p-6 space-y-6">
        <div className="space-y-4">
          <p className="text-slate-200">
            I'm Dhruv Ladani — a Computer Engineering student (B.Tech, CGPA 9.34) at Pandit Deendayal Energy University, graduating in 2026. I enjoy building AI/ML-enabled products and shipping end-to-end software while working at the intersection of product and engineering.
          </p>
          
          <p className="text-slate-200">
            I'm a curious, hardworking technologist with over six years of hands‑on coding experience—starting in school with Java and expanding into C++ as I tackled thousands of errors, exceptions and competitive‑programming challenges on CodeForces, CodeChef, LeetCode and GeeksForGeeks. Having recently solidified my data‑structures and algorithms foundation, I now channel that problem‑solving mindset into both backend logic and client‑side interfaces.
          </p>
          
          <p className="text-slate-200">
            As an app‑development enthusiast, I've built native Android applications in Kotlin, cross‑platform solutions with Flutter, and full-stack web applications using the MERN (MongoDB, Express.js, React, Node.js) stack. I thrive on crafting seamless user experiences, whether I'm architecting performant data flows with Node.js backends, designing intuitive React interfaces, or creating RESTful APIs with Express. My projects, from mobile-first applications to responsive web platforms, live in GitHub repos and production builds that I'd be glad to demo—feel free to reach out if you'd like to explore!
          </p>
          
          <p className="text-slate-200">
            On the AI/ML front, I've laid my groundwork in machine learning fundamentals and data science techniques, then moved on to generative AI and large‑language models. I've integrated LLM APIs, experimented with fine‑tuning, and begun prototyping agentic AI workflows. Today, I'm also diving into product management and growth strategy, bringing together technical build, user insights, and data‑driven roadmaps to deliver meaningful, scalable features. Let's connect if you're passionate about intelligent applications, innovative product roadmaps, or the intersection of code, data and user experience.
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
