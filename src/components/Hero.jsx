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
          Computer Engineering student passionate about data, AI/ML, and full-stack development with MERN and Django, blending problem-solving, data-driven insights, and product strategy to build impactful, scalable solutions. 
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
        initial={{ scale: 0.95, opacity: 0, rotate: -2 }}
        animate={{ 
          scale: 1, 
          opacity: 1, 
          rotate: 0,
          transition: { 
            duration: 0.8,
            ease: [0.2, 0.8, 0.2, 1]
          }
        }}
        whileHover={{ 
          y: -5,
          transition: { 
            duration: 0.3,
            ease: "easeOut"
          }
        }}
        className="flex items-center justify-center w-full h-full p-4 relative group"
      >
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-accent/30 via-purple-500/30 to-blue-500/30 rounded-2xl blur opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:duration-500"></div>
          <div className="relative w-88 h-88 md:w-[28rem] md:h-[28rem] rounded-2xl overflow-hidden glass border-2 border-accent/20 p-1.5 transform transition-all duration-300 group-hover:scale-[1.02] group-hover:border-accent/40">
            <motion.img
              src="/avatar.jpg"
              alt="Dhruv avatar"
              className="w-full h-full object-cover rounded-xl"
              initial={{ scale: 1 }}
              whileHover={{ 
                scale: 1.15,
                transition: { duration: 0.5 }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
