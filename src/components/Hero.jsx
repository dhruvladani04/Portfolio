import React from 'react';
import { motion } from 'framer-motion';
import { SiCodeforces, SiLeetcode, SiCodechef } from 'react-icons/si';

// Direct paths to resume files
const resumeTech = '/resume-tech.pdf';
const resumePM = '/resume-pm.pdf';

export default function Hero() {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <h1 className="text-4xl uppercase text-accent font-medium leading-tight">Hi, I'm Dhruv 👋</h1>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          I build AI-enabled products & web apps.
        </h1>
        <p className="text-lg text-slate-300 max-w-xl">
          Computer Engineering student focused on AI/ML, product-minded engineering and building polished, production-ready user experiences.
          (Open to tech & product roles.)
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href={resumeTech}
            download="Dhruv_Ladani_Tech_Resume.pdf"
            className="px-4 py-2 rounded-md bg-primary hover:brightness-110 transition whitespace-nowrap"
          >
            Download Resume (Tech)
          </a>

          <a
            href={resumePM}
            download="Dhruv_Ladani_PM_Resume.pdf"
            className="px-4 py-2 rounded-md border border-slate-700 hover:bg-slate-800 transition whitespace-nowrap"
          >
            Download Resume (PM)
          </a>

          <a
            href="mailto:dhruvladani04@gmail.com"
            className="px-4 py-2 rounded-md border border-slate-700 hover:bg-slate-800 transition whitespace-nowrap"
          >
            Email Me
          </a>
        </div>

        <div className="pt-4">
          <p className="text-sm text-slate-400 mb-2">Coding Profiles:</p>
          <div className="flex gap-4">
            <a 
              href="https://codeforces.com/profile/dhruvcodes04" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-300 hover:text-white transition"
              title="Codeforces"
            >
              <SiCodeforces className="text-accent text-lg" />
              <span>Codeforces</span>
            </a>
            <a 
              href="https://leetcode.com/dhruvcodes04/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-300 hover:text-white transition"
              title="LeetCode"
            >
              <SiLeetcode className="text-accent text-lg" />
              <span>LeetCode</span>
            </a>
            <a 
              href="https://www.codechef.com/users/dhruv_codes04" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-300 hover:text-white transition"
              title="CodeChef"
            >
              <SiCodechef className="text-accent text-lg" />
              <span>CodeChef</span>
            </a>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mx-auto"
      >
        <div className="w-72 h-72 rounded-2xl overflow-hidden glass border p-2 mx-auto">
          <img
            src="/avatar.jpg"
            alt="Dhruv avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </div>
  )
}
