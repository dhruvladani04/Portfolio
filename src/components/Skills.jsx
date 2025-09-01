import React from 'react'
import { motion } from 'framer-motion'

const skillGroups = [
  { 
    title: 'Languages', 
    items: ['Python', 'Java', 'C', 'C++', 'Dart', 'Kotlin', 'JavaScript'] 
  },
  { 
    title: 'Frameworks & Tools', 
    items: ['Node.js', 'Express', 'Flutter', 'Android SDK', 'React', 'Django', 'Git', 'Docker', 'Figma'] 
  },
  { 
    title: 'Databases & Cloud', 
    items: ['MongoDB', 'Firebase', 'MySQL', 'SQLite'] 
  },
  { 
    title: 'Product', 
    items: ['Jira', 'ClickUp', 'Product Roadmap', 'Feature Prioritization', 'KPI Definition', 'Data Analytics'] 
  }
]

export default function Skills() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Skills</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {skillGroups.map((group, index) => (
          <motion.div 
            key={group.title}
            className="glass p-5 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h3 className="font-semibold text-lg mb-3 text-accent">{group.title}</h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map(skill => (
                <span 
                  key={skill} 
                  className="px-3 py-1 text-sm rounded-full bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
