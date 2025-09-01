import React from 'react'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { SiCodeforces, SiLeetcode, SiCodechef } from 'react-icons/si'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-slate-900/50 mt-20 py-8 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-slate-400">
              © {currentYear} Dhruv Ladani. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex space-x-6">
              <a 
                href="https://github.com/dhruvladani04" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-accent transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              
              <a 
                href="https://www.linkedin.com/in/dhruv-ladani-a65578252" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              
              <a 
                href="mailto:dhruvladani04@gmail.com"
                className="text-slate-400 hover:text-accent transition-colors"
                aria-label="Email"
              >
                <FaEnvelope size={20} />
              </a>
            </div>
            
            <div className="h-px w-full bg-slate-800 md:hidden"></div>
            
            <div className="flex space-x-6">
              <a 
                href="https://codeforces.com/profile/dhruvcodes04" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-accent transition-colors"
                aria-label="Codeforces"
              >
                <SiCodeforces size={20} />
              </a>
              
              <a 
                href="https://leetcode.com/dhruvcodes04/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-accent transition-colors"
                aria-label="LeetCode"
              >
                <SiLeetcode size={20} />
              </a>
              
              <a 
                href="https://www.codechef.com/users/dhruv_codes04" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-accent transition-colors"
                aria-label="CodeChef"
              >
                <SiCodechef size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-slate-500">
          <p>Built with React, Tailwind CSS, and Vite</p>
          <p className="mt-1">Designed and developed with ❤️ by Dhruv Ladani</p>
        </div>
      </div>
    </footer>
  )
}
