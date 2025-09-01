import React, { useState } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'contact', label: 'Contact' }
  ]

  return (
    <nav className="fixed w-full z-40 top-0 left-0">
      <div className="backdrop-blur glass container mx-auto px-6 py-3 flex items-center justify-between">
        <a href="#home" className="text-xl font-bold tracking-tight">Dhruv Ladani</a>

        <div className="hidden md:flex gap-6 items-center">
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`} className="hover:text-accent transition">
              {l.label}
            </a>
          ))}
          <a
            className="ml-4 inline-block px-4 py-2 rounded-md border border-transparent hover:bg-accent hover:text-black transition"
            href="https://www.linkedin.com/in/dhruv-ladani-a65578252"
            target="_blank" rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="menu">
          {open ? <HiX size={26} /> : <HiMenu size={26} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden container mx-auto px-6 py-4 glass rounded-b-lg">
          <div className="flex flex-col gap-3">
            {links.map(l => (
              <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)} className="py-2">
                {l.label}
              </a>
            ))}
            <a
              href="https://www.linkedin.com/in/dhruv-ladani-a65578252"
              target="_blank" rel="noreferrer"
              className="py-2"
            >
              LinkedIn
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
