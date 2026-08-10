import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { fetchResumeData } from './api';
import { defaultData } from './data';
import { Link } from 'react-router-dom';

export function Overlay() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [expandedEduIndex, setExpandedEduIndex] = useState<number | null>(null);
  
  const [data, setData] = useState<typeof defaultData | null>(null);

  useEffect(() => {
    fetchResumeData().then(setData);
  }, []);

  if (!data) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;

  const { hero, contact, education, experiences, skillCategories, featuredProjects } = data;

  return (
    <div className="w-full">
      {/* Page 1: Hero */}
      <section className="min-h-[100vh] w-full flex flex-col justify-center px-8 md:px-24 pt-20 pb-20">
        <div className="max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-8xl font-thin tracking-tight mb-6"
          >
            {hero.name} <br/><span className="font-semibold text-blue-400">{hero.surname}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl leading-relaxed mb-6"
          >
            {hero.subtitle} 
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-lg text-gray-500 font-light max-w-2xl leading-relaxed"
          >
            {hero.description}
          </motion.p>
        </div>
      </section>

      {/* Page 2: Experience */}
      <section className="min-h-[100vh] w-full flex flex-col justify-center px-8 md:px-24 py-20 relative">
        <div className="max-w-4xl z-10">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-light tracking-tight mb-16"
          >
            Professional <span className="font-semibold text-purple-400">Experience</span>
          </motion.h2>
          
          <div className="space-y-12">
            {experiences.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
              >
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                  <h3 className="text-2xl md:text-3xl font-medium group-hover:text-purple-300 transition-colors duration-300">
                    {item.role}
                  </h3>
                  <span className="text-sm text-gray-500 font-mono tracking-widest mt-2 md:mt-0">{item.year}</span>
                </div>
                <div className="text-xl text-gray-400 font-light mb-4">{item.company}</div>
                
                <AnimatePresence>
                  {expandedIndex === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="text-gray-300 leading-relaxed text-left max-w-2xl ml-auto border-l-2 border-purple-400/30 pl-4">
                        <p className="mb-4 text-gray-200">{item.description}</p>
                        <ul className="space-y-3">
                          {item.details?.map((detail, idx) => (
                            <li key={idx}>
                              <span className="font-semibold text-purple-300">{detail.title}: </span>
                              <span className="text-gray-400">{detail.desc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Page 3: Education */}
      <section className="min-h-[80vh] w-full flex flex-col justify-center px-8 md:px-24 pt-20 pb-20">
        <div className="max-w-2xl">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-light tracking-tight mb-12"
          >
            Education
          </motion.h2>
          
          <div className="space-y-8">
            {education.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group cursor-pointer border-l-2 border-gray-800 pl-6"
                onClick={() => setExpandedEduIndex(expandedEduIndex === i ? null : i)}
              >
                <div className="text-sm text-gray-500 mb-1 font-mono tracking-widest">{item.year}</div>
                <h3 className="text-2xl md:text-3xl font-medium group-hover:text-green-300 transition-colors duration-300">
                  {item.role}
                </h3>
                <div className="text-lg text-gray-400 mt-1">{item.company}</div>
                <AnimatePresence>
                  {expandedEduIndex === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-300 leading-relaxed max-w-xl">
                        {item.details}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Page 4: Core Skills */}
      <section className="min-h-[70vh] flex flex-col justify-center py-20 relative px-6 md:px-24">
        <div className="w-full max-w-6xl mx-auto z-10">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            className="text-4xl md:text-6xl font-light mb-16 tracking-tight"
          >
            Core <span className="font-semibold text-blue-400">Skills</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {skillCategories.map((category, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.1 }}
              >
                <h3 className="text-2xl text-blue-300 mb-6 font-medium">{category.title}</h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, j) => (
                    <div
                      key={j}
                      className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:border-blue-400/50 hover:bg-blue-400/10 hover:text-blue-300 transition-all duration-300 text-sm"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Page 5: Featured Work */}
      <section className="min-h-screen flex items-center justify-center py-20 relative px-6 md:px-20">
        <div className="w-full max-w-6xl z-10">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            className="text-4xl md:text-6xl font-light mb-16 tracking-tight"
          >
            Selected <span className="font-semibold text-cyan-400">Work</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects?.map((project, i) => (
              <motion.a
                key={i}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.1 }}
                className="group block p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-300 relative overflow-hidden flex flex-col h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-medium text-gray-200 group-hover:text-cyan-300 transition-colors">{project.title}</h3>
                    <svg className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-sm mb-8 leading-relaxed flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags?.map((tag, j) => (
                      <div key={j} className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-md border border-white/5">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
                        <span className="text-xs text-gray-300 font-mono tracking-wide">{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Page 6: Contact */}
      <section className="min-h-[100vh] w-full flex flex-col justify-center px-8 md:px-24 items-center text-center pt-20 pb-20">
        <div className="max-w-3xl flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-thin tracking-tight mb-8"
          >
            Get in <span className="font-semibold text-blue-400">Touch</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col items-center gap-4 text-xl text-gray-400 font-light mb-12 max-w-xl"
          >
            <p>
              {contact.location}<br />
              {contact.phone}
            </p>
          </motion.div>
          
          <div className="flex flex-col sm:flex-row gap-6 mt-6">
            <motion.a 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.4 }}
              href={`mailto:${contact.email}`}
              className="inline-block px-12 py-4 border border-gray-600 hover:border-white hover:bg-white hover:text-black transition-all duration-500 tracking-widest text-sm uppercase"
            >
              Send Email
            </motion.a>
            <motion.a 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.5 }}
              href={contact.resumeUrl}
              download
              className="inline-flex items-center justify-center gap-3 px-12 py-4 border border-blue-400/50 bg-blue-400/10 text-blue-300 hover:bg-blue-400 hover:text-black transition-all duration-500 tracking-widest text-sm uppercase"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Resume
            </motion.a>
          </div>
        </div>
      </section>

      <div className="text-center pb-8"><Link to="/admin" className="text-gray-700 hover:text-gray-400 text-xs tracking-widest uppercase">Admin Login</Link></div>
    </div>
  );
}
