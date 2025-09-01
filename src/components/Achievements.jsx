import React from 'react';
import { motion } from 'framer-motion';

const achievements = [
  {
    id: 1,
    title: 'CodeChef 5★ Coder',
    description: 'Achieved 5-star rating on CodeChef with a maximum rating of 2093',
    icon: '🏆',
    date: '2025'
  },
  {
    id: 2,
    title: 'CodeForces Expert',
    description: 'Reached Expert rank (max rating 1685) on CodeForces',
    icon: '⚡',
    date: '2025'
  },
  {
    id: 3,
    title: '500+ DSA Problems Solved',
    description: 'Solved 500+ problems on LeetCode, Codechef, Codeforces with a focus on Data Structures and Algorithms and Competitive Programming',
    icon: '💻',
    date: '2025'
  },
  {
    id: 4,
    title: 'Odoo Hackathon Finalist',
    description: 'Our tema was selectedelected as a finalist in the Odoo Hackathon, showcasing expertise in Odoo development and business application solutions.',
    icon: '🏅',
    date: '2025'
  },
  {
    id: 5,
    title: 'Research Paper: API Access Behavior Analysis',
    description: 'Presented at 2nd International Conference on AI and Machine Learning (AIMV 2025). Research on using ML to enhance API security through behavior analysis.',
    icon: '🔍',
    date: '2025'
  },
  {
    id: 6,
    title: 'Research Paper: Advanced Water Quality Assessment',
    description: 'Published in 8th International Conference on Computing, Communication, Control and Automation (ICCCBEA 2024). Focused on using integrated machine learning models for water quality classification.',
    icon: '📄',
    date: '2024',
    link: 'https://ieeexplore.ieee.org/document/10775218/'
  },
];

export default function Achievements() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <h2 className="text-3xl font-bold mb-8">Achievements</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            className="glass rounded-xl p-6 hover:bg-slate-800/50 transition-colors"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start">
              <span className="text-3xl mr-4">{achievement.icon}</span>
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold mb-1">{achievement.title}</h3>
                  <span className="text-sm text-slate-400 bg-slate-800/50 px-2 py-1 rounded-full">
                    {achievement.date}
                  </span>
                </div>
                <p className="text-slate-300">
                  {achievement.description}
                  {achievement.link && (
                    <a 
                      href={achievement.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="ml-2 text-accent hover:underline inline-flex items-center"
                    >
                      <span>Read Paper</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
