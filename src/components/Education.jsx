import React from 'react';
import { motion } from 'framer-motion';

const education = [
  {
    id: 1,
    institution: 'Pandit Deendayal Energy University',
    location: 'Gujarat',
    degree: 'B.Tech (Computer Engineering)',
    year: '2026',
    score: 'CGPA: 9.34/10',
    icon: '🎓',
  },
  {
    id: 2,
    institution: 'Saint Paul\'s School',
    location: 'Rajkot, Gujarat',
    degree: '12th Grade',
    board: 'Council for the Indian School Certificate Examinations',
    year: '2022',
    score: 'Percentage: 95.2%',
    icon: '📚',
  },
  {
    id: 3,
    institution: 'Saint Paul\'s School',
    location: 'Rajkot, Gujarat',
    degree: '10th Grade',
    board: 'Council for the Indian School Certificate Examinations',
    year: '2020',
    score: 'Percentage: 88.6%',
    icon: '📖',
  },
];

export default function Education() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <h2 className="text-3xl font-bold mb-8">Education</h2>
      
      <div className="space-y-8">
        {education.map((edu, index) => (
          <motion.div
            key={edu.id}
            className="glass rounded-xl p-6 hover:bg-slate-800/50 transition-colors"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start">
              <span className="text-3xl mr-4">{edu.icon}</span>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{edu.institution}</h3>
                    <p className="text-slate-400">{edu.location}</p>
                  </div>
                  <span className="text-sm text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full mt-2 md:mt-0">
                    {edu.year}
                  </span>
                </div>
                
                <div className="mt-3">
                  <p className="text-slate-300 font-medium">{edu.degree}</p>
                  {edu.board && (
                    <p className="text-slate-400 text-sm mt-1">{edu.board}</p>
                  )}
                  <p className="text-accent mt-2">{edu.score}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
