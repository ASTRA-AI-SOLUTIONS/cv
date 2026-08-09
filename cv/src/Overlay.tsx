import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export function Overlay() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [expandedEduIndex, setExpandedEduIndex] = useState<number | null>(null);

  const featuredProjects = [
    {
      title: "Mirage AI Detector",
      url: "https://mirage12.vercel.app/",
      description: "An Android accessibility application designed to protect users from AI-constructed deepfakes and media (hosted as a web app for display). Powered by our in-house AI model 'Mirage', trained on thousands of parameters to accurately detect if a video or image is AI-generated.",
      tags: ["AI Model", "Accessibility", "Android", "Web App"]
    },
    {
      title: "Indian Prenup",
      url: "https://indianprenup.vercel.app",
      description: "A financial risk assessment web application. It combines our proprietary Mirage model with a Gemini wrapper to analyze and calculate financial risks and implications in the event of a divorce.",
      tags: ["Gemini AI", "Finance", "Web App"]
    },
    {
      title: "Sneha Write",
      url: "https://sneha-write.vercel.app",
      description: "A dynamic library collection of poetry. It demonstrates live editing capabilities, allowing authorized users to update the website's content directly from the frontend using secure password access.",
      tags: ["CMS", "Live Editing", "React"]
    }
  ];

  const education = [
    { 
      year: 'Recent', 
      role: 'Machine Learning Specialization', 
      company: 'Stanford Online via DeepLearning.AI',
      details: 'Completed comprehensive coursework in machine learning, covering supervised learning, unsupervised learning, and advanced algorithms. Gained practical experience in building and evaluating ML models.'
    },
    { 
      year: '2018', 
      role: 'B.Tech (ME, Robotics and Automation)', 
      company: 'Lovely Professional University',
      details: 'Relevant Subjects: Industrial Engineering, Manufacturing Processes, Operations Research, robotics and automation, supply chain management.'
    }
  ];

  const experiences = [
    { 
      year: '2022 – Present', 
      role: 'Independent Content Operations & Strategy', 
      company: 'Self-Employed (AdSense Monetized)',
      description: 'Managed end-to-end digital production workflows and revenue generation.',
      details: [
        { title: 'Data Analytics & Excel', desc: 'Tracked performance metrics (traffic sources, CTR, revenue) using Excel spreadsheets to forecast trends and adjust content strategy.' },
        { title: 'Process Optimization', desc: 'Utilized AI and Large Language Models (LLMs) to automate scripting and research tasks, reducing production time by 30%.' },
        { title: 'Resource Management', desc: 'Managed scheduling, digital asset inventory, and publishing timelines to ensure zero downtime in content delivery.' }
      ]
    },
    { 
      year: 'May 2020 – Oct 2021', 
      role: 'Sales and Service Engineer', 
      company: 'Ionex Chemical and Engineers',
      description: 'Oversaw technical service delivery and client account management for industrial chemical solutions.',
      details: [
        { title: 'Service Logistics', desc: 'Coordinated the delivery of technical services and products to industrial clients, ensuring on-time fulfillment of requirements.' },
        { title: 'Inventory & Planning', desc: 'Assessed client technical needs to ensure accurate product provisioning and inventory alignment.' },
        { title: 'Vendor & Client Relations', desc: 'Acted as the primary bridge between the engineering team and external clients, resolving operational bottlenecks quickly.' }
      ]
    },
    { 
      year: '2018 – 2020', 
      role: 'Financial Advisor', 
      company: 'SBI Life Insurance',
      description: 'Managed a portfolio of clients, focusing on financial planning and risk management.',
      details: [
        { title: 'Forecasting & Planning', desc: 'Analyzed client financial data to forecast future needs and recommend suitable long-term investment products.' },
        { title: 'Relationship Management', desc: 'Built a sustainable client network through consistent follow-ups and effective communication of complex policy details.' },
        { title: 'Performance Targets', desc: 'Consistently tracked and met sales performance metrics through disciplined pipeline management.' }
      ]
    },
    { 
      year: 'June 2018 – July 2018', 
      role: 'Manufacturing Intern', 
      company: 'Surya Roshni Limited',
      description: 'Worked in the lighting manufacturing division, focusing on production line performance and quality control.',
      details: [
        { title: 'Manufacturing Process Optimization', desc: 'Conducted time studies on assembly lines and suggested layout changes and procedural adjustments aimed at modifying and speeding up the overall manufacturing process.' },
        { title: 'Quality Control', desc: 'Assisted the quality assurance team in inspecting finished goods and raw materials to maintain product standards.' },
        { title: 'Troubleshooting', desc: 'Supported and followed technicians in identifying and resolving minor machine and process failures to minimize downtime.' }
      ]
    },
    { 
      year: 'May 2017 – June 2017', 
      role: 'Process Engineering Intern', 
      company: 'SRF Limited',
      description: 'Gained exposure to the manufacturing operations and process optimization in a large-scale plastic sheet manufacturing industry.',
      details: [
        { title: 'Process Modification & Efficiency', desc: 'Assisted in analyzing existing production lines, identifying bottlenecks, and proposing minor modifications to the process flow to speed up the manufacturing process.' },
        { title: 'Documentation', desc: 'Created and updated standard operating procedures (SOPs) for key process stages, contributing to better workflow adherence.' },
        { title: 'Safety Compliance', desc: 'Monitored equipment operation and assisted in ensuring adherence to industrial safety regulations.' }
      ]
    }
  ];

  const skillCategories = [
    {
      title: "Technical Skills",
      skills: ["Python", "Machine Learning", "AI & LLM Workflow Integration", "Oracle"]
    },
    {
      title: "Soft Skills",
      skills: ["Negotiation", "Critical Thinking", "Adaptability", "Cross-functional Communication"]
    },
    {
      title: "Supply Chain & Operations",
      skills: ["Process Improvement", "Inventory Management Basics", "Vendor Relations", "Logistics Coordination", "Demand Planning"]
    },
    {
      title: "Languages",
      skills: ["English (Fluent)", "Hindi (Fluent)", "Punjabi (Fluent)", "Haryanvi (Fluent)", "Kumaoni (Fluent)"]
    }
  ];

  const examsCleared = [
    {
      name: "UPSC CDSE 2021",
      desc: "Cleared written examination & SSB interview, validating strong leadership and officer potential."
    },
    {
      name: "AFCAT",
      desc: "Successfully cleared the Air Force Common Admission Test written examination."
    }
  ];

  return (
    <div className="w-full">
      {/* Page 1: Hero */}
      <section className="min-h-[100vh] w-full flex flex-col justify-center px-8 md:px-24 pt-20 pb-20">
        <div className="max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-8xl font-thin tracking-tight mb-6"
          >
            Ikshit <br/><span className="font-semibold text-blue-400">Joshi.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-400 font-light max-w-xl leading-relaxed"
          >
            Versatile Engineering graduate with a diverse background in technical sales, financial advisory, and digital media. Proven track record in independent content creation, leveraging advanced AI tools and LLMs.
          </motion.p>
        </div>
      </section>

      {/* Page 2: Experience */}
      <section className="min-h-[100vh] w-full flex flex-col justify-center px-8 md:px-24 items-end text-right pt-20 pb-20">
        <div className="max-w-2xl w-full">
          <motion.h2 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-thin tracking-tight mb-12"
          >
            Professional <span className="font-semibold text-purple-400">Experience</span>
          </motion.h2>
          
          <div className="space-y-8">
            {experiences.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group cursor-pointer border-b border-gray-800 pb-6"
                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
              >
                <div className="text-sm text-gray-500 mb-1 font-mono tracking-widest">{item.year}</div>
                <h3 className="text-2xl md:text-3xl font-medium group-hover:text-purple-300 transition-colors duration-300">
                  {item.role}
                </h3>
                <div className="text-lg text-gray-400 mt-1">{item.company}</div>
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
                          {item.details.map((detail, idx) => (
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
      <section className="min-h-screen w-full flex flex-col justify-center px-8 md:px-24 pt-20 pb-20">
        <div className="max-w-2xl">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-light tracking-tight mb-12"
          >
            Education & <span className="font-semibold text-green-400">Certifications</span>
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
            {featuredProjects.map((project, i) => (
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
                    {project.tags.map((tag, j) => (
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

      {/* Page 6: Exams Cleared (Compact) */}
      <section className="py-16 relative px-6 md:px-20 border-t border-white/5">
        <div className="w-full max-w-4xl mx-auto z-10 text-center">
          <h3 className="text-sm font-mono tracking-widest text-gray-500 uppercase mb-8">Competitive Exams Cleared</h3>
          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16">
            {examsCleared.map((exam, i) => (
              <div key={i} className="text-center max-w-xs mx-auto">
                <h4 className="text-lg font-medium text-gray-300 mb-2">{exam.name}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{exam.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Page 7: Contact */}
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
              Delhi<br />
              +91-9760915613
            </p>
            <a 
              href="https://github.com/ASTRA-AI-SOLUTIONS" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2 text-lg"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              ASTRA-AI-SOLUTIONS
            </a>
          </motion.div>
          
          <div className="flex flex-col sm:flex-row gap-6 mt-6">
            <motion.a 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.4 }}
              href="mailto:ikshitjoshi2@gmail.com"
              className="inline-block px-12 py-4 border border-gray-600 hover:border-white hover:bg-white hover:text-black transition-all duration-500 tracking-widest text-sm uppercase"
            >
              Send Email
            </motion.a>
            <motion.a 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.5 }}
              href="/Ikshit_Joshi_Resume.pdf"
              download="Ikshit_Joshi_Resume.pdf"
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
    </div>
  );
}
